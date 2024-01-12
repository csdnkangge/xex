<!--  -->

<template>
  <el-card class="deposit_container">
    <div class="page_title">
      <span class="line"></span>{{ $t("deposit_list.title") }}
    </div>
    <el-form :inline="true" label-position="top">
      <el-form-item :label="$t('uid')" class="form-item">
        <el-input
          v-model="baseInfo.uid"
          :placeholder="$t('uid')"
          clear="form-input"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('partner_uid')" class="form-item">
        <el-input
          v-model="baseInfo.pid"
          :placeholder="$t('partner_uid')"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('symbol')" class="form-select-item form-item">
        <el-select
          v-model="baseInfo.symbol"
          filterable
          :placeholder="$t('symbol')"
        >
          <el-option
            v-for="(item, index) in coinList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('deposit_list.trade_date')"
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
        {{ $t("deposit_list.total") }}：<span class="DP-Bold">{{
          sumUsdt
        }}</span>
        <span class="DP-Medium">USDT</span>
      </div>
    </div>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      style="width: 100%"
      :row-style="rowStyle"
    >
      <el-table-column :label="$t('deposit_list.account')" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="rate" label="上级返佣比例(%)" align="center" /> -->
      <!-- <el-table-column label="用户身份" align="center">
        <template slot-scope="scope">
          {{ scope.row.rate && scope.row.rate > 0 ? "合伙人" : "普通用户" }}
        </template>
      </el-table-column> -->
      <el-table-column
        prop="uid"
        :label="$t('uid')"
        width="150"
        align="center"
      />

      <el-table-column
        prop="pid"
        :label="$t('partner_uid')"
        width="150"
        align="center"
      />
      <el-table-column
        prop="symbol"
        :label="$t('symbol')"
        width="150"
        align="center"
      />
      <el-table-column
        prop="amount"
        :label="$t('deposit_list.deposit_amount')"
        width="200"
        align="center"
      />
      <el-table-column :label="$t('deposit_list.deposit_state')" align="center">
        <template slot-scope="scope">
          {{
            scope.row.status === 0
              ? $t("deposit_list.unconfirmed")
              : scope.row.status === 1
              ? $t("deposit_list.completed")
              : scope.row.status === 2
              ? $t("deposit_list.unusual")
              : $t("deposit_list.unknow")
          }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('deposit_list.deposit_time')"
        prop="createTime"
        align="center"
        :formatter="formatTime"
      />
      <el-table-column
        :label="$t('deposit_list.completed_time')"
        prop="completedTime"
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
import Api from "@/api/moneyRecord/moneyRecord";

import { timeFormat, dateFormat } from "@/utils/index";
import moment from "moment";
export default {
  name: "depositList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    return {
      dialogVisible: {
        merchant: false
      },
      rowStyle: {
        backgroundColor: "#F5F6F9",
        borderRadius: "8px",
        overflow: "hidden"
      },

      sumUsdt: "0",
      remarkFormData: {
        id: "",
        remark: ""
      },
      filterTime: "",
      baseInfo: {
        page: 1,
        pageSize: 10,
        searchTimeEnd: "",
        searchTimeStart: "",
        uid: "",
        pid: "",
        symbol: ""
      },
      // 数据总数
      total: 0,
      // 表格数据
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
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    filterTime(val) {
      if (val && val.length > 0) {
        // let time = val[0] + ',' + val[1]
        this.$set(this.baseInfo, "searchTimeStart", val[0]);
        this.$set(this.baseInfo, "searchTimeEnd", val[1]);
      } else {
        this.$set(this.baseInfo, "searchTimeStart", "");
        this.$set(this.baseInfo, "searchTimeEnd", "");
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
    async getTableData() {
      this.tableLoading = true;
      if (this.coinList.length == 0) {
        await Api.getCoinList({}).then(res => {

          this.coinList = res.data.map(item => {
            if (item === "all") {
              if (this.$i18n.locale == "en") {
                item = "All";
              } else if (this.$i18n.locale == "zh") {
                item = "全部";
              }
            }
            return item;
          });
          this.baseInfo.symbol = this.coinList[0];
        });
      }
      let data = {};
      Object.keys(this.baseInfo).forEach(key => {
        if (this.baseInfo[key] !== "") {
          if (key !== "symbol") {
            data[key] = this.baseInfo[key];
          } else {
            if (this.baseInfo[key] === "全部" || this.baseInfo[key] === "All") {
              data[key] = "all";
            } else {
              data[key] = this.baseInfo[key];
            }
          }
        }
      });
      Api.getDepositList(data).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.sumUsdt = res.data.usdt;
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
    // this.getSymbolList()
    // this.getCoinList()
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

.deposit_container {
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
.remark span {
  display: inline-block;
  white-space: wrap;
}
</style>
