<!--  -->
<template>
  <el-card class="close_order_list_container">
    <div class="page_title">
      <span class="line"></span>{{ $t("transaction_summary.title") }}
    </div>
    <el-form :inline="true" label-position="top">
      <el-form-item :label="$t('uid')" class="form-item">
        <el-input v-model="baseInfo.uid" :placeholder="$t('uid')" clearable />
      </el-form-item>
      <el-form-item :label="$t('partner_uid')" class="form-item">
        <el-input
          v-model="baseInfo.pid"
          :placeholder="$t('partner_uid')"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('time')" class="date-form-item">
        <el-date-picker
          v-model="filterTime"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('start_time')"
          :end-placeholder="$t('end_time')"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          :clearable="false"
        ></el-date-picker>
        <el-button class="day_btn" @click="setDay('yesterday')">{{$t('yesterday')}}</el-button>
        <el-button class="day_btn" @click="setDay('today')">{{$t('today')}}</el-button>
        <el-button class="search_btn" @click="searchData">{{$t('search')}}</el-button>
      </el-form-item>
    </el-form>
    <div class="total_info">
      <div class="total_amount info-item">
        {{$t('transaction_summary.zjsyk')}}：<span class="DP-Bold">{{ successInfo.totalAmount }}</span
        ><span class="DP-Medium">USDT</span>
      </div>
      <div class="total_fee info-item">
        {{$t('transaction_summary.total_fee')}}：<span class="DP-Bold">{{ successInfo.totalFee }}</span
        ><span class="DP-Medium">USDT</span>
      </div>
      <div class="total_profit info-item">
        {{$t('transaction_summary.zjyk')}}：
        <el-tooltip
          class="item"
          effect="light"
          :content="successInfo.explain"
          placement="right"
          popper-class="toolpop"
          v-if="successInfo.explain"
        >
          <i class="icon-font icon-yiwen"></i>
        </el-tooltip>
        <span class="DP-Bold">{{ successInfo.totalProfit }}</span
        ><span class="DP-Medium">USDT</span>
      </div>
    </div>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      :row-style="rowStyle"
      style="width: 100%"
    >
      <!-- <el-table-column label="订单ID" prop="id" align="center" width="80">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="click">
            <div class="content">
              <span :id="'order_id_' + scope.row.id">{{ scope.row.id }}</span>

              <i
                class="icon-font icon-fuzhi-2 copy_order_id"
                style="color:#707AFF;"
                @click="handleCopy(scope.row.id)"
              ></i>
            </div>
            <i
              class="icon-font icon-dingdan copy_order_id"
              style="color:#707AFF;font-size: 20px;"
              slot="reference"
            ></i>
          </el-popover>
        </template>
      </el-table-column> -->
      <!-- 用户uid -->
      <el-table-column :label="$t('uid')" prop="uid" align="center" width="120" />
      <!-- 合伙人uid -->
      <el-table-column
        :label="$t('partner_uid')"
        prop="pid"
        align="center"
        width="120"
      />
      <el-table-column :label="$t('transaction_summary.total_deposit')" prop="cryptoDepositAmount" align="center" />
      <el-table-column :label="$t('transaction_summary.total_withdraw')" prop="cryptoWithdrawAmount" align="center" />
      <el-table-column :label="$t('transaction_summary.fiat_deposit')" prop="fiatDepositAmount" align="center" />
      <el-table-column :label="$t('transaction_summary.fiat_withdraw')" prop="fiatWithAmount" align="center" />
      <!-- 总成交额 -->
      <el-table-column :label="$t('transaction_summary.total_turnover')" prop="tradeAmount" align="center" />
      <!--  总手续费-->
      <el-table-column :label="$t('transaction_summary.total_fee')" prop="totalFee" align="center" />
      <!--总结算盈亏  -->
      <el-table-column :label="$t('transaction_summary.zjsyk')" prop="totalAmount" align="center" />
      <!-- 总净盈亏 -->
      <el-table-column :label="$t('transaction_summary.zjyk')" prop="totalProfit" align="center" />
     
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
import Api from "@/api/contract/contract";
import moment from "moment";
import {
  timeFormat,
  dateFormat,
  thousandsComma,
  nul,
  division,
  fixD,
  getDigit
} from "@/utils/index";
export default {
  name: "contractSuccessOrderListSum",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    let _minTime = null;
    let _maxTime = null;
    return {
      successInfo: {},
      contractList: [],
      dialogVisible: {
        detail: false
      },
      rowStyle: {
        backgroundColor: "#F5F6F9",
        borderRadius: "8px",
        overflow: "hidden"
      },
      filterTime: "",
      baseInfo: {
        page: 1,
        pageSize: 10,
        uid: "",
        timeEnd: dateFormat(moment()),
        timeStart: dateFormat(moment())
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
      },
      getDataTimer: null,
      pickerOptions: {
        disabledDate(time) {
          if (_minTime && _maxTime) {
            return time.getTime() < _minTime || time.getTime() > _maxTime;
          }
          //  else if (!_minTime && !_maxTime) {
          //   return (
          //     time.getTime() > Date.now() ||
          //     time.getTime() <=
          //       Number(
          //         moment()
          //           .subtract(6, "months")
          //           .format("x")
          //       )
          //   );
          // }
        },
        onPick(time) {
          // 如果选择了只选择了一个时间
          console.log(time)
          if (!time.maxDate) {
            let timeRange = 180 * 24 * 60 * 60 * 1000; // 7天
            _minTime = time.minDate.getTime() - timeRange; // 最小时间
            _maxTime = time.minDate.getTime() + timeRange; // 最大时间
            // _minTime = Number(moment(time.minDate.getTime()).subtract(6, "months").format("x")); // 最小时间
            // _maxTime = Number(moment(time.minDate.getTime()).add(6, "months").format("x")); // 最大时间

            // 如果选了两个时间，那就清空本次范围判断数据，以备重选
          } else {
            _minTime = _maxTime = null;
          }
        }
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
        this.$set(this.baseInfo, "timeStart", val[0]);
        this.$set(this.baseInfo, "timeEnd", val[1]);
      } else {
        this.$set(this.baseInfo, "timeStart", "");
        this.$set(this.baseInfo, "timeEnd", "");
      }
      // this.searchData();
    },
    tableData(data) {
      if (data && data.length) {
        clearInterval(this.getDataTimer);
        this.getDataTimer = null;
        this.intervalGetData();
      } else {
        clearInterval(this.getDataTimer);
        this.getDataTimer = null;
      }
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
    async getTableData(silence) {
      if (!silence) {
        this.tableLoading = true;
      }

      let data = {};
      Object.keys(this.baseInfo).forEach(key => {
        if (this.baseInfo[key] !== "") {
          if (key !== "symbol") {
            data[key] = this.baseInfo[key];
          } else {
            if (this.baseInfo[key] !== "全部") {
              data[key] = this.baseInfo[key];
            }
          }
        }
      });
      Api.getSuccessInfo(data).then(res => {
        this.successInfo = res.data;
      });
      Api.getSuccessOrderList(data).then(res => {
        this.total = res.data.rows;
        this.tableData = res.data.data;
        this.tableLoading = false;
        this.intervalGetData();
      });
    },
    handleCopy(id) {
      const range = document.createRange();
      // 创建range对象;
      range.selectNode(document.getElementById("order_id_" + id)); //获取复制内容的 id 选择器
      const selection = window.getSelection(); //创建 selection对象
      if (selection.rangeCount > 0) selection.removeAllRanges(); //如果页面已经有选取了的话，会自动删除这个选区，没有选区的话，会把这个选取加入选区
      selection.addRange(range); //将range对象添加到selection选区当中，会高亮文本块
      document.execCommand("copy"); //复制选中的文字到剪贴板
      this.$message({
        message: "复制成功",
        type: "success"
      });
      selection.removeRange(range); // 移除选中的元素
    },
    intervalGetData() {
      clearInterval(this.getDataTimer);
      this.getDataTimer = setInterval(() => {
        this.getTableData(true);
        if (!this.tableData.length) {
          clearInterval(this.getDataTimer);
          this.getDataTimer = null;
        }
      }, 60000);
    },
    getDigit(vol) {
      return getDigit(vol);
    },
    // 设置 标的货币单位的数量 还是 张数
    setVolume(vol, fix, multiplier) {
      let volume = vol;
      // 标的货币
      // if (this.coUnitType === 1 && multiplier) {
      // 算出标的货币数量（数量 * 合约面值）
      volume = fixD(nul(vol, parseFloat(multiplier)), fix);
      // }
      return volume;
    },
    setUnit(name, index = 0) {
      if (!name || typeof name != "string") {
        return "";
      }
      let arr = name.split("-");
      return arr[index];
    },
    thousandsComma(num) {
      if (num) {
        return thousandsComma(num);
      }
      return num;
    },
    // 完成度
    makeRate(dealVolume, volume) {
      if (dealVolume && volume) {
        // 已完成数量 / 委托数量
        const value = nul(division(dealVolume, volume), 100);
        return fixD(value, 2);
      }
      return 0.0;
    },
    // 订单类型
    typeStatus(status) {
      let str = "";
      switch (status) {
        case 1:
          str = "限价单";
          break;
        case 2:
          str = "市价单";
          break;
        case 3:
          str = "IOC";
          break;
        case 4:
          str = "FOK";
          break;
        case 5:
          str = "只做maker";
          break;
        case 6:
          str = "强制减仓";
          break;
        case 7:
          str = "仓位合并";
          break;
        default:
          str = "";
      }
      return str;
    },
    // 时间格式转化
    formatTime(row, col, val) {
      return timeFormat(val);
    },
    formatDate(row, col, val) {
      return dateFormat(val);
    },
    dateFormat(val) {
      return dateFormat(moment(val));
    },
    moment(val) {
      return moment(val);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.filterTime = [dateFormat(moment()), dateFormat(moment())];
    this.getTableData();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {
    clearInterval(this.getDataTimer);
    this.getDataTimer = null;
  }, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss">
//@import url(); 引入公共css类
.close_order_list_container {
  border-radius: 8px;
  .red {
    color: rgba(235, 77, 92, 1) !important;
  }
  .green {
    color: rgba(19, 184, 135, 1) !important;
  }
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

  .total_info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    .info-item {
      margin-right: 30px;
    }
  }
}

.copy_order_id {
  cursor: pointer;
}
.toolpop {
  border-color: #cdcdcd !important;
  .popper__arrow {
    border-right-color: #cdcdcd !important;
  }
}
</style>
