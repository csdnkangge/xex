<!--  -->

<template>
  <el-card class="otc_detail_container">
    <div class="page_title">
      <span class="line"></span>{{ $t("fiat_trade_detail.title") }}
    </div>
    <el-form :inline="true" label-position="top">
      <el-form-item
        :label="$t('fiat_trade_detail.trade_date')"
        class="date-form-item"
      >
        <el-date-picker
          v-model="filterTime"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('start_time')"
          :end-placeholder="$t('end_time')"
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
    <div class="total_info">
      <div class="total_amount info-item">
        {{$t('fiat_trade_detail.total_buy')}}：<span class="DP-Bold">{{ total_info.buyTotal }}</span>
        <!-- <span class="DP-Medium">USDT</span> -->
      </div>
      <div class="total_fee info-item">
        {{$t('fiat_trade_detail.total_sell')}}：<span class="DP-Bold">{{ total_info.sellTotal }}</span>
        <!-- <span class="DP-Medium">USDT</span> -->
      </div>
      <div class="total_profit info-item">
        {{$t('fiat_trade_detail.total_transfer')}}：
        <!-- <el-tooltip
          class="item"
          effect="light"
          :content="successInfo.explain"
          placement="right"
          popper-class="toolpop"
          v-if="successInfo.explain"
        >
          <i class="icon-font icon-yiwen"></i>
        </el-tooltip> -->
        <span class="DP-Bold">{{ total_info.transferTotal }}</span>
        <!-- <span class="DP-Medium">USDT</span> -->
      </div>
    </div>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      style="width: 100%"
      :row-style="rowStyle"
    >
      <el-table-column :label="$t('fiat_trade_detail.symbol')" prop="symbol" width="200" align="center" />
      <el-table-column :label="$t('fiat_trade_detail.buy')" align="center">
        <template slot-scope="scope">
          {{ scope.row.type == 0 ? scope.row.total : 0 }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('fiat_trade_detail.sell')" align="center">
        <template slot-scope="scope">
          {{ scope.row.type == 3 ? scope.row.total : 0 }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('fiat_trade_detail.transfer')" align="center">
        <template slot-scope="scope">
          {{
            scope.row.type == 1
              ? scope.row.total
              : scope.row.type == 2
              ? "-" + scope.row.total
              : 0
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="ctime"
        :label="$t('fiat_trade_detail.time')"
        align="center"
        :formatter="formatTime"
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
import page from "@/components/Page";
import { mapGetters } from "vuex";
import Api from "@/api/userAssets/userAssets";
import { timeFormat, dateFormat } from "@/utils/index";
import moment from "moment";
export default {
  name: "otcAccountDetail",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    return {
      rowStyle: {
        backgroundColor: "#F5F6F9",
        borderRadius: "8px",
        overflow: "hidden"
      },

      filterTime: "",
      baseInfo: {
        page: 1,
        pageSize: 10,
        uid: this.$route.query.uid
      },
      total_info: {},
      // 数据总数
      total: 0,
      // 表格数据
      sourceData: [],
      tableLoading: false,
      tableData: [],
      loading: false,
      coinList: [],
      mobileFormData: {
        id: "",
        mobile: ""
      }
    };
  },
  ...mapGetters(["userinfo"]),
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
    },
    // 查询表格数据
    async getTableData() {
      this.tableLoading = true;

      let data = {};
      Object.keys(this.baseInfo).forEach(key => {
        if (this.baseInfo[key] !== "") {
          data[key] = this.baseInfo[key];
        }
      });
      Api.getOTCAccountDetail(data).then(res => {
        this.tableData = res.data.data;
        this.total_info = {
          buyTotal: res.data.buyTotal,
          sellTotal: res.data.sellTotal,
          transferTotal: res.data.transferTotal
        };
        this.total = res.data.row;
        this.tableLoading = false;
      });
    },

    // 时间格式转化
    formatTime(row, col, val) {
      return timeFormat(val);
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

.otc_detail_container {
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
  .form-select-item {
    .el-select {
      display: flex;
      .el-input__suffix {
        top: 3px;
      }
    }
  }
  .search-form-item {
    padding-top: 30px;
    .search_btn {
      width: 68px;
      height: 32px;
      line-height: 32px;
      color: #707aff;
      font-size: 14px;
      padding: 0;
      border: 1px solid #707aff;
      border-radius: 4px;
      margin-left: 16px;
    }
    .search_btn {
      background: #707aff;
      color: #fff;
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
  .total_info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    .info-item {
      margin-right: 30px;
    }
  }
  .poster_mask {
    background: #f5f6ff;
    .remark_main {
      width: 692px;
      height: 345px;
      background: #ffffff;
      box-shadow: 4px 4px 20px 0px rgba(66, 76, 218, 0.2);
      border-radius: 8px;
      padding: 20px 24px;

      .label {
        color: #0e1337;
        font-size: 16px;
        margin-bottom: 24px;
      }
      .input_box {
        height: 205px;
        .el-textarea {
          height: 205px;
          textarea {
            height: 210px;
            border: 1px solid #e7e8eb;
            resize: none;
            padding: 24px;
            font-size: 16px;
          }
          textarea::placeholder {
            color: #b7b9c3;
            font-size: 16px;
          }
          .el-input__count {
            font-size: 16px;
            color: #888a9c;
            right: 24px;
            bottom: 24px;
          }
        }
      }
      .submit_btn {
        width: 156px;
        height: 37px;
        background: #707aff;
        border-radius: 4px;
        text-align: center;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        font-size: 16px;
        margin: 20px 244px;

        span {
          // letter-spacing: 10px;
        }
      }
    }
  }
}
.remark span {
  display: inline-block;
  white-space: wrap;
}
</style>
