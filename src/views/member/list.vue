<!--  -->
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item>
        <el-button @click="addMocUser()" type="primary">新增虚拟用户</el-button>
      </el-form-item>
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
      <!-- <el-form-item label="用户类型：">
        <el-select
          v-model="baseInfo.userType"
          placeholder="请选择用户类型"
          @change="searchData"
          clearable
        >
          <el-option
            v-for="item in userTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="创建时间:">
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
      <el-table-column prop="id" label="uid" width="100" align="center">
      </el-table-column>
      <el-table-column
        prop="realName"
        label="姓名"
        align="center"
        width="150"
      />
      <el-table-column prop="email" label="邮箱" align="center" width="150" />

      <el-table-column
        prop="mobileNumber"
        label="手机号码"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          <!-- <el-button @click="changeMobile(scope.row)" type="text"> -->
          {{
            scope.row.mobileNumber
          }}
          <!-- </el-button> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="excStatus"
        align="center"
        label="交易状态"
        width="100"
      >
        <template slot-scope="scope">
          {{
            scope.row.excStatus === 0
              ? `冻结`
              : scope.row.excStatus === 1
              ? `正常`
              : `未知状态`
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="loginStatus"
        align="center"
        label="登录状态"
        width="100"
      >
        <template slot-scope="scope">
          {{
            scope.row.loginStatus === 0
              ? `冻结`
              : scope.row.loginStatus === 1
              ? `正常`
              : `未知状态`
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="userType"
        align="center"
        label="用户类型"
        width="100"
        :formatter="formatUserType"
      />

      <el-table-column
        label="创建时间"
        prop="ctime"
        align="center"
        :formatter="formatTime"
      />

      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)"
            >设为模拟账户</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="批量添加虚拟用户"
      :visible.sync="dialogVisible['mocUser']"
      width="60%"
      center
    >
      <div class="clearfix">
        <el-col :span="20" :push="2">
          <el-form
            ref="mocForm"
            :rules="rules"
            :model="formData"
            label-width="120px"
          >
            <el-form-item label="请输入用户uid" prop="uid">
              <el-input v-model="formData.uidList" placeholder="请输入uid" />
              <div class="tips">多个uid请用英文逗号隔开(,)</div>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible.mocUser = false">取 消</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click="handleSubmit('mocForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
import Api from "@/api/member/member";
import { timeFormat } from "@/utils/index";
export default {
  name: "memberList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    // 这里存放数据
    return {
      dialogVisible: {
        mocUser: false
      },
      rules: {
        uidList: [{ required: true, message: "请填写用户uid", trigger: "blur" }]
      },
      formData: {
        uidList: ""
      },
      keyTitle: [
        { label: "uid", value: 1 },
        { label: "手机号", value: 2 },
        { label: "email", value: 3 }
      ],
      userTypeList: [
        { id: 0, label: "普通用户" },
        { id: 1, label: "公司用户" },
        { id: 2, label: "回购用户" },
        { id: 3, label: "机器人用户" },
        { id: 4, label: "做市用户" },
        { id: 5, label: "可疑用户" },
        { id: 6, label: "模拟用户" }
      ],
      filterTime: "",
      baseInfo: {
        page: 1,
        pageSize: 10,
        keyType: 1,
        keyword: "",
        userType: "",
        ctimeEnd: "",
        ctimeStart: ""
      },
      // 数据总数
      total: 0,
      // 表格数据
      tableLoading: false,
      tableData: [],
      loading: false,
      mobileFormData: {
        id: "",
        mobile: ""
      }
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
      Api.getMemberList(this.baseInfo).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },
    addMocUser() {
      this.formData = {
        uidList: ""
      };
      this.$set(this.dialogVisible, "mocUser", true);
    },
    handleSubmit(form) {
      this.loading = true;
      this.$refs[form].validate(valid => {
        if (valid) {
          let { uidList } = this.formData;
          Api.setTestUsers({ uidList }).then(res => {
            this.loading = false;
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.$set(this.dialogVisible, "mocUser", false);
            this.getTableData();
          });
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
      if (row.userType == 6) {
        this.$message({
          message: "该账户已是模拟账户",
          type: "info",
          duration: 1000
        });
        return;
      }
      this.$confirm(`确定将该账户设置成模拟账户？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          Api.setTestUser({ id: row.id }).then(res => {
            this.$message({
              message: "设置成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.getTableData();
              }
            });
          });
        })
        .catch(() => {});
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
        case 6:
          return "模拟用户";
        default:
          return "未知";
      }
    },
    // 时间格式转化
    formatTime(row, col, val) {
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
