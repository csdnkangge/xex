<!-- 交易员列表 -->
<template>
  <el-card>
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
      <el-table-column prop="followerUid" label="跟单者UID" align="center" />
      <el-table-column prop="traderUid" label="交易员UID" align="center" />
      <el-table-column prop="contractId" label="合约信息" align="center" />
      <el-table-column label="开仓/平仓" align="center">
        <template slot-scope="scope">
          {{scope.row.open=='CLOSE'?'平仓':scope.row.open=='OPEN'?'开仓':'未知'}}
        </template>  
      </el-table-column>

      <el-table-column prop="traderUid" label="做空/做多" align="center" >
        <template slot-scope="scope">
          {{scope.row.side=='SELL'?'做空':scope.row.side=='BUY'?'做多':'未知'}}
        </template>  
      </el-table-column>
      <el-table-column
        prop="ctime"
        :formatter="formatTime"
        label="下单时间"
        align="center"
      />
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

import Api from "@/api/traderOrder/traderOrder";
import page from "@/components/Page";
import { timeFormat, dateFormat } from "@/utils/index";
export default {
  name: "followUserList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    // 这里存放数据
    return {
      dialogVisible: {
        merchant: false
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
      loading: false
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
      let data = {};
      // 移除空字段
      Object.keys(this.baseInfo).forEach(key => {
        if (this.baseInfo[key] !== "") {
          data[key] = this.baseInfo[key];
        }
      });
      Api.followOrderList(data).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },
    handleAccept(row) {
      this.$confirm("确定同意该申请？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          Api.acceptApply({ uid: row.uid }).then(res => {
            this.$message({
              message: "交易员添加成功",
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
    handleMenuCommand(command, row) {
      if (command == "deny") {
        this.$confirm("确定拒接该申请？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            Api.denyApply({ uid: row.uid }).then(res => {
              this.$message({
                message: "已拒绝该申请",
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
