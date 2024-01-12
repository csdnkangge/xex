<!-- 交易员列表 -->
<template>
  <el-card>
    <el-form :inline="true" style="margin-bottom:20px">
      <el-button type="primary" @click="addTrader">添加交易员</el-button>
    </el-form>
    <!-- <el-form :inline="true">
      <el-form-item label="币种：">
        <el-select
          v-model="baseInfo.symbol"
          placeholder="请选择币种"
          @change="searchData"
          clearable
          filterable
        >
          <el-option
            v-for="item in coinList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态：">
        <el-select
          v-model="baseInfo.status"
          placeholder="请选择订单状态"
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
      <el-form-item label="txid:">
        <el-input clearable placeholder="请输入txid" v-model="baseInfo.txid" />
      </el-form-item>
      <el-form-item label="电话或邮箱:">
        <el-input clearable placeholder="请输入电话或邮箱" v-model="baseInfo.mobileOrEmail" />
      </el-form-item>
      
      <el-form-item label="统计时间:">
        <el-date-picker
          v-model="filterTime"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
    </el-form> -->
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="UID" align="center" />
      <el-table-column prop="email" label="邮箱" align="center" />
      <el-table-column prop="mobileNumber" label="电话" align="center" />

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-dropdown
            split-button
            type="primary"
            @click="handleToDetail(scope.row)"
            @command="e => handleMenuCommand(e, scope.row)"
            size="mini"
          >
            跟单详情
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="cancel">取消交易员</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <page
      :total="total"
      :page.sync="baseInfo.page"
      :limit.sync="baseInfo.pageSize"
      @pagination="getTableData"
    ></page>
    <el-dialog
      title="添加交易员"
      :visible.sync="dialogVisible['trader']"
      width="60%"
      center
    >
      <div class="clearfix">
        <el-col :span="22" :push="1">
          <el-form :inline="true" style="margin-bottom:10px">
            <el-form-item>
              <el-input
                clearable
                placeholder="请输入内容"
                v-model="addTraderBaseInfo.keyword"
              >
                <el-select
                  v-model="addTraderBaseInfo.keyType"
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
                  @click="searchUserData"
                ></el-button>
              </el-input>
            </el-form-item>
          </el-form>
          <el-table
            :data="addTraderData"
            v-loading="userTableLoading"
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
            >
              <template slot-scope="scope">
                <el-button @click="changeMobile(scope.row)" type="text">{{
                  scope.row.mobileNumber
                }}</el-button>
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleChoose(scope.row)"
                  >添加为交易员</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import page from "@/components/Page";
import Api from "@/api/traderOrder/traderOrder";
import memberApi from "@/api/member/member";
import { timeFormat, dateFormat } from "@/utils/index";
export default {
  name: "followOrderUserList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    // 这里存放数据
    return {
      dialogVisible: {
        trader: false
      },
      statusList: [
        { id: 0, label: "未确认" },
        { id: 1, label: "确认" },
        { id: 2, label: "异常" }
      ],

      keyTitle: [
        { label: "uid", value: 1 },
        { label: "手机号", value: 2 },
        { label: "email", value: 3 }
      ],
      coinList: [],
      filterTime: "",
      total: "",
      baseInfo: {
        page: 1,
        pageSize: 10,
        uid: ""
      },
      // 数据总数
      total: 0,
      // 表格数据
      tableLoading: false,
      tableData: [],
      loading: false,
      userTableLoading: false,
      addTraderForm: {},
      addTraderData: [],
      addTraderBaseInfo: {}
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
    handleChoose(row){
      this.$confirm("确定添加该用户为交易员？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            Api.addTrader({ uid: row.id }).then(res => {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.getTableData();
                  this.$set(this.dialogVisible,'trader',false)
                }
              });
            });
          })
          .catch(() => {});
    },
    searchUserData() {
      this.userTableLoading = true;
      this.addTraderBaseInfo.page = 1;
      memberApi.getMemberList(this.addTraderBaseInfo).then(res => {
        this.addTraderData = res.data.data;
        this.userTableLoading = false;
      });
    },
    addTrader() {
      this.addTraderForm = {
        uid: ""
      };
      this.addTraderData = [];
      this.addTraderBaseInfo = {
        page: 1,
        pageSize: 100,
        keyType:1,
        keyword: ""
      };
      this.$set(this.dialogVisible, "trader", true);
    },
    // 表格数据筛选
    searchData() {
      this.baseInfo.page = 1;
      this.getTableData();
    }, // 查询表格数据
    getTableData() {
      this.tableLoading = true;
      let data = {};
      // 移除空字段
      Object.keys(this.baseInfo).forEach(key => {
        if (this.baseInfo[key] !== "") {
          data[key] = this.baseInfo[key];
        }
      });
      Api.getFollowOrderUsers(data).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },
    handleToDetail(row) {
      this.$router.push({
        name: "followOrderUserDetail",
        query: {
          uid: row.id
        }
      });
    },
    handleMenuCommand(command, row) {
      if (command == "cancel") {
        this.$confirm("确定取消该交易员？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            Api.cancelTrader({ uid: row.id }).then(res => {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.getTableData();
                }
              });
            });
          })
          .catch(() => {});
      }
    },
    // 时间格式转化
    formatTime(row, col, val) {
      return timeFormat(val);
    },
    formatDate(row, col, val) {
      return dateFormat(val);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
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
