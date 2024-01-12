<!--  -->
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item>
        <el-input clearable placeholder="请输入内容" v-model="baseInfo.keyword">
          <el-select
            v-model="baseInfo.keyType"
            class="search-select"
            slot="prepend"
            placeholder="请选择"
            style="width:120px"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in keyTitle"
              :key="item.value"
            ></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchData"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="认证状态：">
        <el-select
          v-model="baseInfo.authStatus"
          placeholder="请选择认证状态"
          @change="searchData"
          clearable
        >
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提交审核时间:">
        <el-date-picker
          v-model="filterTime"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      border
      style="width: 100%"
    >
      <el-table-column prop="uid" label="uid" width="100" align="center">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" width="150" />

      <el-table-column
        prop="mobileNumber"
        label="手机号码"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          <!-- <el-button @click="changeMobile(scope.row)" type="text">{{
            scope.row.mobileNumber
          }}</el-button> -->
          {{ scope.row.mobileNumber }}
        </template>
      </el-table-column>
      <el-table-column
        prop="mtime"
        align="center"
        label="提交审核时间"
        :formatter="formatTime"
      />
      <el-table-column label="首次审核时间" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.firstRecord">
            <div>{{ formatTime1(scope.row.firstRecord.minRecordTime) }}</div>
            <div>(AdminId:{{ scope.row.firstRecord.adminId }})</div>
          </template>
          <template v-else>
            <div>-</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="最近审核时间" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.lastRecord">
            <div>{{ formatTime1(scope.row.lastRecord.maxRecordTime) }}</div>
            <div>(AdminId:{{ scope.row.lastRecord.adminId }})</div>
          </template>
          <template v-else>
            <div>-</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="实名"
        align="center"
        width="150"
      />
      <el-table-column  label="审核状态" align="center" width="150">
        <template slot-scope="scope">{{
            scope.row.authStatus===0?'未审核':scope.row.authStatus===1?'审核通过':scope.row.authStatus===2?'审核未通过':'未知'
          }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleToDetail(scope.row)"
            >查看详情</el-button
          >
          <!-- <el-select
            v-model="scope.row.authStatus"
            placeholder="请选择"
            @change="e => handleChangeStatus(e, scope.row)"
          >
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select> -->
        </template>
      </el-table-column>
    </el-table>
    <page
      :total="total"
      :page.sync="baseInfo.page"
      :limit.sync="baseInfo.pageSize"
      @pagination="getTableData"
    ></page>
  </el-card>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import page from "@/components/Page";
import Api from "@/api/member/authList";
import { timeFormat } from "@/utils/index";
export default {
  name: "authList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    // 这里存放数据
    let validatePass = (rule, value, callback) => {
      if (!this.formData.id) {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.formData.verify_password !== "") {
            this.$refs.merchantForm.validateField("verify_password");
          }
          callback();
        }
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (!this.formData.id || this.formData.password) {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.formData.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
     
      keyTitle: [
        { label: "UID", value: 1 },
        { label: "手机号", value: 2 },
        { label: "email", value: 3 }
      ],
      statusList: [
        { id: 0, label: "未审核" },
        { id: 1, label: "通过" },
        { id: 2, label: "未通过" }
      ],
      filterTime: "",
      baseInfo: {
        page: 1,
        pageSize: 10,
        keyType: 1,
        keyword: "",
        authStatus: "",
        ctimeEnd: "",
        ctimeStart: ""
      },
      // 数据总数
      total: 0,
      // 表格数据
      tableLoading: false,
      tableData: [],
      loading: false,
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    filterTime(val) {
      if (val && val.length > 0) {
        // let time = val[0] + ',' + val[1]
        this.$set(this.baseInfo, "ctimeStart", val[0]);
        this.$set(this.baseInfo, "ctimeEnd", val[1]);
      } else {
        this.$set(this.baseInfo, "ctimeStart", "");
        this.$set(this.baseInfo, "ctimeEnd", "");
      }
      this.searchData();
    }
  },
  // 方法集合
  methods: {
    // 表格数据筛选
    searchData() {
      this.baseInfo.page = 1;
      this.getTableData();
    }, // 查询表格数据
    getTableData() {
      this.tableLoading = true;
      // let data = {};
      // // 移除空字段
      // Object.keys(this.baseInfo).forEach(key => {
      //   if (this.baseInfo[key] !== "") {
      //     data[key] = this.baseInfo[key];
      //   }
      // });
      Api.getAuthList(this.baseInfo).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },
    handleToDetail(row) {
      console.log(row);
      // Api.authDetail({id:row.uid})
      this.$router.push({
        name: "authDetail",
        query: {
          id: row.uid
        }
      });
      // Api.updateAuthStatus({uid:uid,})
    },
    add() {
      this.formData = {
        address: "",
        projectName: "",
        projectCode: "",
        remark: "",
        escription: "",
        id: "",
        status: 0
      };
      this.$set(this.dialogVisible, "merchant", true);
    },
    handleSubmit(form) {
      this.loading = true;
      this.$refs[form].validate(valid => {
        if (valid) {
          let {
            email,
            mobile,
            userCode,
            remark,
            userName,
            id,
            password,
            status
          } = this.formData;
          if (id) {
            Api.updateMerchant({
              email,
              mobile,
              userCode,
              remark,
              userName,
              id,
              status
            })
              .then(res => {
                console.log(res);
                this.$message({
                  message: "更新成功",
                  type: "success",
                  duration: 2 * 1000,
                  onClose: () => {
                    this.loading = false;
                    this.getTableData();
                    this.dialogVisible.merchant = false;
                  }
                });
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            Api.addMerchant({
              email,
              mobile,
              userCode,
              remark,
              userName,
              password,
              status
            })
              .then(res => {
                this.$message({
                  message: "创建成功",
                  type: "success",
                  duration: 2 * 1000,
                  onClose: () => {
                    this.loading = false;
                    this.getTableData();
                    this.dialogVisible.merchant = false;
                  }
                });
              })
              .catch(() => {
                this.loading = false;
              });
          }
        } else {
          this.loading = false;
          return false;
        }
      });
    },
    handleMenuCommand(command, row) {
      if (command == "mobile") {
        this.mobileFormData = {
          id: row.id,
          mobile: row.mobile
        };
        this.$prompt("请输入电话号码", "修改电话", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入电话号码",
          inputValue: row.mobile
        }).then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的电话号码是: " + value
          });
        });
      }
    },
    changeMobile(row) {
      this.mobileFormData = {
        id: row.id,
        mobileNumber: row.mobileNumber
      };
      this.$prompt("请输入电话号码", "修改电话", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入电话号码",
        inputValue: row.mobileNumber
      }).then(({ value }) => {
        this.$set(this.mobileFormData, "mobileNumber", value);
        Api.updateMobile(this.mobileFormData).then(res => {
          console.log(res);
          this.$message({
            message: "更新成功",
            type: "success",
            duration: 2 * 1000,
            onClose: () => {
              this.loading = false;
              this.getTableData();
            }
          });
        });
      });
    },
    handleEdit(row) {
      this.formData = {
        ...row,
        verify_password: row.password
      };
      this.dialogVisible.merchant = true;
    },
    formatWithdraw(row, col, val) {
      switch (Number(val)) {
        case 0:
          return "未审核";
        case 1:
          return "审核通过";
        case 2:
          return "审核拒绝";
        case 3:
          return "汇款中";
        case 4:
          return "已完成";
        case 5:
          return "汇款失败";
        case 6:
          return "已撤销";
        default:
          return "未知";
      }
    },
    formatUserType(row, col, val) {
      switch (Number(val)) {
        case 0:
          return "普通用户";
        case 1:
          return "公司用户";
        case 2:
          return "回购用户";
        case 3:
          return "机器人用户";
        case 4:
          return "做市用户";
        case 5:
          return "可疑用户";
        default:
          return "未知";
      }
    },

    // 时间格式转化
    formatTime(row, col, val) {
      return timeFormat(val);
    },
    formatTime1(val) {
      return timeFormat(val);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.getSymbolList()
    this.getTableData();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
