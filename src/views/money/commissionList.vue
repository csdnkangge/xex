<!--  -->
<template>
  <el-card class="commission_list_container">
    <div class="page_title">
      <span class="line"></span>{{ $t("commission_list.title") }}
    </div>
    <el-form :inline="true" label-position="top">
      <el-form-item
        :label="$t('commission_list.rebate_date')"
        class="date-form-item"
      >
        <el-date-picker
          v-model="filterTime"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('commission_list.start_date')"
          :end-placeholder="$t('commission_list.end_date')"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button class="day_btn" @click="setDay('yesterday')">{{
          $t("yesterday")
        }}</el-button>
        <el-button class="day_btn" @click="setDay('today')">{{
          $t("today")
        }}</el-button>
        <el-button class="search_btn" @click="searchData">{{
          $t("search")
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      :row-style="rowStyle"
      style="width: 100%"
    >
      <el-table-column
        :label="$t('commission_list.rebate_date')"
        prop="dayTime"
        align="center"
        :formatter="formatDate"
      />
      <el-table-column
        :label="$t('commission_list.commission_ratio') + '(%)'"
        prop="rate"
        align="center"
      />
      <el-table-column
        :label="$t('commission_list.trade_fees')"
        prop="feeSum"
        align="center"
      />
      <!-- 系统计算交易手续费返佣 -->
      <el-table-column
        :label="$t('commission_list.xtjsjysxffy')"
        prop="amount"
        align="center"
      />
      <!-- 实际发放交易手续费返佣 -->
      <el-table-column
        :label="$t('commission_list.sjffjysxffy')"
        prop="amount"
        align="center"
      />
      <!-- 发放时间 -->
      <el-table-column
        :label="$t('commission_list.rebate_time')"
        prop="ctime"
        align="center"
        width="180"
        :formatter="formatTime"
      />
      <!-- operate -->
      <el-table-column :label="$t('operate')" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.row)"
            >{{ $t("commission_list.rebate_details") }}</el-button
          >
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
import Api from "@/api/partner/partner";
import { timeFormat, dateFormat } from "@/utils/index";
import moment from "moment";
export default {
  name: "commissionList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    return {
      dialogVisible: {
        detail: false
      },
      rowStyle: {
        backgroundColor: "#F5F6F9",
        borderRadius: "8px",
        overflow: "hidden"
      },
      
      formData: {
        userCode: "",
        userName: "",
        password: "",
        remark: "",
        escription: "",
        id: "",
        status: 0
      },
      filterTime: "",
      baseInfo: {
        page: 1,
        pageSize: 10,
        partnerUid: this.$route.query.id,
        subUid: "",
        subUsername: "",
        partnerUsername: ""
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
        this.$set(this.baseInfo, "startTime", val[0]);
        this.$set(this.baseInfo, "endTime", val[1]);
      } else {
        this.$set(this.baseInfo, "startTime", "");
        this.$set(this.baseInfo, "endTime", "");
      }
      // this.searchData();
    }
  },
  // 方法集合
  methods: {
    setDay(day) {
      if (day == "today") {
        let day = dateFormat(moment());
        this.filterTime = [day, day];
      }
      if (day == "yesterday") {
        let day = dateFormat(moment().subtract(1, "d"));
        this.filterTime = [day, day];
      }
    },
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
      Api.getCommissionList(this.baseInfo).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },

    handleEdit(row) {
      // row.dayTime
      let regesterTimeEnd = dateFormat(moment(row.dayTime).add(1, "d"));
      let regesterTimeStart = dateFormat(moment(row.dayTime));
      let data = {
        regesterTimeStart,
        regesterTimeEnd
      };
      this.$router.push({
        name: "commissionDetail",
        query: {
          start: regesterTimeStart,
          end: regesterTimeEnd
        }
      });
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
<style lang="scss">
//@import url(); 引入公共css类
.commission_list_container {
  border-radius: 8px;
  .page_title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #0e1337;
    line-height: 33px;
    margin: -4px 0 24px -20px;
    .line {
      display: inline-block;
      width: 5px;
      height: 24px;
      background: #707aff;
      border-radius: 3px;
      margin-right: 9px;
    }
  }
  .form-item {
    .el-form-item__label {
      padding-bottom: 0;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #0e1337;
      line-height: 20px;
      margin-bottom: 12px;
    }
    .el-form-item__content {
      width: 120px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid rgba(151, 151, 151, 0.5);
      .el-input {
        height: 30px;
        display: flex;
        align-items: flex-start;
      }
      input {
        height: 30px;
        line-height: 30px;
        border: none;
        // background: transparent;
        padding: 0 15px 0 12px;
      }
      input::placeholder {
        color: #b7b9c3;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
      }
    }
  }
  .date-form-item {
    .el-form-item__label {
      padding-bottom: 0;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #0e1337;
      line-height: 20px;
      margin-bottom: 12px;
    }
    .el-date-editor {
      height: 32px;
      width: 280px;
      border: 1px solid rgba(151, 151, 151, 0.5);
      .el-range-separator {
        text-align: center;
        line-height: 22px;
        padding: 0;
        color: #b7b9c3;
      }
    }
    .day_btn,
    .search_btn {
      // width: 68px;
      height: 32px;
      line-height: 32px;
      color: #707aff;
      font-size: 14px;
      padding: 0 15px;
      border: 1px solid #707aff;
      border-radius: 4px;
      margin-left: 16px;
    }
    .search_btn {
      background: #707aff;
      color: #fff;
    }
  }
  .el-table__body {
    border-collapse: separate;
    border-spacing: 0 8px;
  }
  .el-table td {
    border-bottom: none;
  }
  .el-table td:first-child {
    border-radius: 8px 0 0 8px;
  }
  .el-table td:last-child {
    border-radius: 0 8px 8px 0;
  }
  .el-table th.is-leaf {
    border: none;
  }
  .el-table::before {
    height: 0;
  }
  .el-table__fixed-right::before {
    height: 0;
  }
}
</style>
