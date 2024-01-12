<template>
  <div class="edit-activity clearfix">
    <el-col :span="18" :sm="23" :xl="18">
      <el-form
        label-width="200px"
        status-icon
        :model="formData"
        :rules="rules"
        ref="myForm"
      >
        <!-- <el-form-item label="加密货币" prop="symbol">
          <el-input v-model="formData.symbol" placeholder="请填写加密货币" />
        </el-form-item>
        <el-form-item label="货币代号(大写字母)" prop="baseSymbol">
          <el-input
            v-model="formData.baseSymbol"
            placeholder="请填写货币代号"
          />
        </el-form-item> -->
        <el-form-item label="基础信息：">
          <el-table
            :data="base_info"
            v-loading="tableLoading"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="uid"
              label="UID"
              width="100"
              align="center"
            />
            <el-table-column
              prop="email"
              label="邮箱"
              align="center"
              width="150"
            />

            <el-table-column
              prop="mobileNumber"
              label="手机号码"
              align="center"
              width="140"
            />
            <el-table-column
              prop="ctime"
              align="center"
              label="注册时间"
              :formatter="formatTime"
            />
            <el-table-column
              prop="certificateType"
              label="证件类型"
              align="center"
              :formatter="formatType"
            />

            <el-table-column
              prop="realName"
              label="姓名"
              align="center"
              width="150"
            />
          </el-table>
        </el-form-item>
        <el-form-item label="审核类型：" prop="verify_type">
          <div>
            {{
              formData.verify_type === 0
                ? "手动审核"
                : formData.verify_type === 1
                ? "自动审核"
                : "未知"
            }}
          </div>
        </el-form-item>
        <el-form-item label="姓名：" prop="realname">
          <div>{{ formData.realname }}</div>
        </el-form-item>
        <el-form-item label="国家或地区：" prop="realname">
          <div>{{ formData.countryEnglishName }}</div>
        </el-form-item>
        <el-form-item label="证件类型：" v-if="formData.authRealname">
          <div>
            {{ formatType(0, 0, formData.authRealname.certificateType) }}
          </div>
        </el-form-item>
        <el-form-item label="证件号码：" v-if="formData.authRealname">
          {{ formData.authRealname.certificateNumber }}
        </el-form-item>
        <el-form-item label="身份证正面照片" v-if="formData.authCertificate">
          <img
            class="logo"
            @click="previewImg(formData.osspath + '/' + formData.firstPhoto)"
            :src="formData.osspath + '/' + formData.firstPhoto"
            alt=""
          />
        </el-form-item>
        <el-form-item label="身份证反面照片" v-if="formData.authCertificate">
          <img
            class="logo"
            @click="previewImg(formData.osspath + '/' + formData.secondPhoto)"
            :src="formData.osspath + '/' + formData.secondPhoto"
            alt=""
          />
        </el-form-item>
        <el-form-item
          label="手写姓名和身份证照片"
          v-if="formData.authCertificate"
        >
          <img
            class="logo"
            @click="previewImg(formData.osspath + '/' + formData.thirdPhoto)"
            :src="formData.osspath + '/' + formData.thirdPhoto"
            alt=""
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark" v-if="formData.authRealname">
          <el-input
            v-model="formData.authRealname.reason"
            placeholder="请填写备注"
          />
        </el-form-item>
        <el-form-item label="审核状态" v-if="formData.authRealname">
          <el-select
            v-model="formData.authRealname.authStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-col :span="2" :offset="7">
          <el-button
            :loading="loading"
            type="primary"
            @click="handleSubmit('myForm')"
            >确定</el-button
          >
        </el-col>
      </el-form>
    </el-col>
    <image-preview
      :dialogVisible.sync="dialogVisible['preview']"
      @close="dialogVisible.preview = false"
      :imgSrc="imgSrc"
    />
  </div>
</template>
<script>
import Api from "@/api/member/authList";
import { timeFormat } from "@/utils/index";
import ImagePreview from "@/components/ImagePreview";
// import symbolApi from '@/api/wallet/symbol'
export default {
  data() {
    return {
      dialogVisible: {
        preview: false
      },
      imgSrc: "",
      loading: false,
      statusList: [
        { id: 0, label: "未审核" },
        { id: 1, label: "审核通过" },
        { id: 2, label: "审核未通过" }
      ],
      id: this.$route.query.id,
      symbolList: [],
      formData: {
        aggAddress: "",
        aggPolice: 0,
        baseSymbol: "",
        checkPolice: 0,
        // configJson: '',
        // confirmCount: 1,
        // contractAddress: '',
        // createAddressSymbol: '',
        energyAddress: "",
        energyMinAmount: "",
        energyPolice: 0,
        energySymbol: "",
        status: 0,
        symbol: "",
        // symbolPrecision: 0,
        // type: 0,
        withdrawAddress: "",
        walletId: this.$store.getters.walletId
      },
      base_info: [],
      tableLoading: false,
      rules: {}
    };
  },
  computed: {},
  components: { ImagePreview },
  created() {
    const id = this.$route.query.id;
    if (id) {
      Api.authDetail({ id }).then(res => {
        this.formData = res.data;
        this.base_info = [
          {
            uid: res.data.user.id,
            email: res.data.user.email,
            mobileNumber: res.data.user.mobileNumber,
            ctime: res.data.user.ctime,
            certificateType: res.data.authRealname.certificateType,
            realName: res.data.realname
          }
        ];
      });
    }
  },
  methods: {
    previewImg(src) {
      this.dialogVisible.preview = true;
      this.imgSrc = src;
    },
    // 证件类型
    formatType(row, col, val) {
      switch (val) {
        case 1:
          return "身份证";
        case 2:
          return "护照";
        case 3:
          return "其他类型";
        case 4:
          return "驾照";
        default:
          return "未知";
      }
    },
    // 时间格式转化
    formatTime(row, col, val) {
      return timeFormat(val);
    },
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let { authRealname, authCertificate } = this.formData;
          let data = {
            authCertificateId: authCertificate.id,
            authStatus: authRealname.authStatus,
            authrealnameId: authRealname.id,
            reason: authRealname.reason,
            uid: authRealname.uid
          };
          console.log(data);
          this.loading = true;
          Api.updateAuthStatus(data)
            .then(res => {
              this.$message({
                message: "审核提交成功",
                type: "success",
                onClose: () => {
                  this.loading = false;
                  if (window.history.length > 1) {
                    this.$router.go(-1);
                    return false;
                  } else {
                    this.$router.push({ name: "authList" });
                  }
                }
              });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-activity {
  margin-bottom: 50px;
  .hint {
    color: #ccc;
  }
}
.logo {
  height: 136px;
  border-radius: 3px;
  max-width: 800px;
  cursor: pointer;
}
</style>
