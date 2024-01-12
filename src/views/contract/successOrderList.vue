<!--  -->
<template>
  <el-card class="success_order_list_container">
    <div class="page_title">
      <span class="line"></span>{{ $t("success_order_list.title") }}
    </div>
    <el-form :inline="true" label-position="top">
      <el-form-item :label="$t('uid')" class="form-item">
        <el-input v-model="baseInfo.uid" :placeholder="$t('uid')" clearable />
      </el-form-item>
      <el-form-item :label="$t('partner_uid')" class="form-item">
        <el-input
          v-model="baseInfo.partnerUid"
          :placeholder="$t('partner_uid')"
          clearable
        />
      </el-form-item>
      <el-form-item
        :label="$t('success_order_list.contract_name')"
        class="form-select-item form-item"
      >
        <el-select
          v-model="baseInfo.symbol"
          filterable
          clearable
          :placeholder="$t('success_order_list.all')"
        >
          <el-option
            v-for="(item, index) in contractList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('success_order_list.transaction_date')"
        class="date-form-item"
      >
        <el-date-picker
          v-model="filterTime"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('start_time')"
          :end-placeholder="$t('end_time')"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
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
      <el-table-column
        :label="$t('uid')"
        prop="uid"
        align="center"
        width="120"
      />
      <!-- 合伙人uid -->
      <el-table-column
        :label="$t('partner_uid')"
        prop="partnerUid"
        align="center"
        width="120"
      />
      <!-- 合约名称 -->
      <el-table-column
        :label="$t('success_order_list.contract_name')"
        prop="contractName"
        align="center"
        width="140"
      />
      <!-- 开仓币种 -->
      <el-table-column
        :label="$t('success_order_list.open_currency')"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          {{ "USDT" }}
        </template>
      </el-table-column>
      <!-- 方向 -->
      <el-table-column
        :label="$t('success_order_list.direction')"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <p
            :class="{
              green: scope.row.side === 'BUY',
              red: scope.row.side === 'SELL'
            }"
          >
            {{ scope.row.direction }}
          </p>
        </template>
      </el-table-column>
      <!-- 杠杆 -->
      <el-table-column
        :label="$t('success_order_list.lever')"
        prop="leverage_level"
        align="center"
      />
      <!-- 成交价格 -->
      <el-table-column
        :label="$t('success_order_list.deal_price')"
        prop="avgPrice"
        width="150"
        align="center"
      />

      <!-- <el-table-column label="委托数量" align="center">
        <template slot-scope="scope">
          <p>
            {{
              setVolume(
                scope.row.volume,
                getDigit(scope.row.multiplier || 0.0001),
                scope.row.multiplier || 0.0001
                scope.row.type==2?2:1
              )
            }}
            {{ setUnit(scope.row.contractName, 0) }}
          </p>
        </template>
      </el-table-column> -->
      <!-- 成交数量 -->
      <el-table-column
        :label="$t('success_order_list.transaction_volume')"
        prop="cj_volume_txt"
        width="180"
        align="center"
      >
        <!-- <template slot-scope="scope">
          <p>
            {{
              scope.row.deal_volume === 0
                ? 0
                : setVolume(
                    scope.row.deal_volume,
                    getDigit(scope.row.multiplier || 0.0001),
                    scope.row.multiplier || 0.0001,
                    scope.row.type == 2 ? 2 : 1
                  )
            }}
            {{ setUnit(scope.row.contractName, 0) }}
          </p>
        </template> -->
      </el-table-column>
      <!-- 委托价格 -->
      <el-table-column
        :label="$t('success_order_list.order_price')"
        width="120"
        prop="price_txt"
        align="center"
      />
      <!-- 手续费 -->
      <el-table-column
        :label="$t('success_order_list.fee')"
        prop="trade_fee_txt"
        width="100"
        align="center"
      />
      <!-- 类型 -->
      <el-table-column
        :label="$t('success_order_list.type')"
        prop="type_txt"
        align="center"
        width="120"
      />
      <!-- <el-table-column label="状态" prop="" align="center">
        <template slot-scope="scope">
          {{ scope.row.status === 2 ? "完全成交" : "部分成交" }}
        </template>
      </el-table-column> -->
      <!-- 成交时间 -->
      <el-table-column
        :label="$t('success_order_list.transaction_time')"
        prop="mtime"
        align="center"
        width="170"
        :formatter="formatTime"
      />
      <!-- 
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)"
            >返佣明细</el-button
          >
        </template>
      </el-table-column> -->
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
  name: "successOrderList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    return {
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
        end: 2,
        symbol: ""
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
          return (
            time.getTime() > Date.now() ||
            time.getTime() <=
              Number(
                moment()
                  .subtract(2, "months")
                  .format("x")
              )
          );
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
        this.$set(this.baseInfo, "startTime", val[0]);
        this.$set(this.baseInfo, "endTime", val[1]);
      } else {
        this.$set(this.baseInfo, "startTime", "");
        this.$set(this.baseInfo, "endTime", "");
      }
      this.searchData();
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
      if (this.contractList.length == 0) {
        await Api.getContractList({}).then(res => {
          // res.data.unshift("全部");
          this.contractList = res.data;
          // this.baseInfo.symbol = this.contractList[0];
        });
      }
      let data = {};
      // 移除空字段
      Object.keys(this.baseInfo).forEach(key => {
        if (this.baseInfo[key] !== "") {
          if (key == "id") {
            data[key] = Number(this.baseInfo[key]);
          } else if (key === "symbol") {
            if (this.baseInfo[key] === "全部") {
              // data[key] = "";
            } else {
              data[key] = this.baseInfo[key];
            }
          } else {
            data[key] = this.baseInfo[key];
          }
        }
      });

      Api.getContractOrderList(data).then(res => {
        if (res.data.data && res.data.data.length > 0) {
          this.tableData = res.data.data.map(item => {
            let coUnitType = this.type == 2 ? 2 : 1;
            item.contractName = item.symbol || "";

            // 开 ：平
            const open = item.open === "OPEN" ? "开" : "平";
            // 空
            let side = "空";
            if (
              (item.open === "OPEN" && item.side === "BUY") ||
              (item.open === "CLOSE" && item.side === "SELL")
            ) {
              // 多
              side = "多";
            }

            item.direction = `${open}${side}`;
            if (item.direction == "开多" || item.direction == "平空") {
              item.direction = `买入${item.direction}`;
            } else {
              item.direction = `卖出${item.direction}`;
            }
            item.direction = this.parseDirection(item.direction);
            item.count = `${this.setVolume(
              item.deal_volume,
              this.getDigit(item.multiplier || 4),
              item.multiplier || 0.0001,
              coUnitType
            )} / ${this.setVolume(
              item.volume,
              this.getDigit(item.multiplier || 4),
              item.multiplier || 0.0001,
              coUnitType
            )}`;
            item.progress = `${this.makeRate(item.deal_volume, item.volume)}%`;
            item.price_txt = null;
            if (item.type === 2 && Number(item.avg_price) === 0) {
              item.price_txt = "市价"; // '市价';
            } else {
              item.price_txt =
                fixD(item.deal_money, item.price_precision || 2) +
                ` ${this.setUnit(item.contractName, 1)}`;
            }
            item.avgPrice =
              item.avg_price == 0
                ? 0
                : fixD(item.avg_price, item.price_precision || 2) +
                  ` ${this.setUnit(item.contractName, 1)}`;
            item.tradeFee =
              item.trade_fee === 0
                ? 0
                : fixD(item.trade_fee, item.price_precision || 2) +
                  ` ${this.setUnit(item.contractName, 1)}`;
            item.trade_fee_txt =
              item.trade_fee === 0
                ? 0
                : fixD(item.trade_fee, item.price_precision || 2) +
                  ` ${this.setUnit(item.contractName, 1)}`;
            // 成交数量/价值
            let deal_volume = null;
            if (item.type === 2 && Number(item.price) === 0) {
              // 价值
              // if (item.open === "OPEN") {
              //   // 反向
              //   let unit = item.base;
              //   let coinFix = this.getDigit(item.multiplier);
              //   // // 正向
              //   if (item.contractSide === 1) {
              //     unit = item.quote;
              //     coinFix = this.pricefix;
              //   }
              //   deal_volume = `${fixD(item.deal_volume, coinFix)} ${unit}`;
              // } else {
              // 成交数量
              deal_volume = `${this.setVolume(
                item.deal_volume,
                this.getDigit(item.multiplier || 4),
                item.multiplier || 0.0001,
                coUnitType
              )} ${item.base}`;
              // }
            } else {
              // 委托数量
              deal_volume = `${this.setVolume(
                item.deal_volume,
                this.getDigit(item.multiplier || 4),
                item.multiplier || 0.0001,
                coUnitType
              )} ${item.base}`;
            }
            item.cj_volume_txt = deal_volume;
            item.type_txt =
              item.type == 1 && item.flag == 2
                ? this.$t("order_list.market_order")
                : this.typeStatus(item.type);
            item.justReduce = item.open === "CLOSE" ? "是" : "否";
            return item;
          });
        } else {
          this.tableData = [];
        }

        this.total = res.data.rows;
        this.tableLoading = false;
        this.intervalGetData();
      });
    },
    parseDirection(val) {
      if (val == "买入开多") {
        val = this.$t("open_long");
      }
      if (val == "买入平空") {
        val = this.$t("close_short");
      }
      if (val == "卖出开空") {
        val = this.$t("open_short");
      }
      if (val == "卖出平多") {
        val = this.$t("close_long");
      }

      return val;
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
        message: this.$t("copy_success"),
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
    setVolume(vol, fix, multiplier, coUnitType = 1) {
      let volume = vol;
      // 标的货币
      if (coUnitType === 1 && multiplier) {
        // 算出标的货币数量（数量 * 合约面值）
        volume = fixD(nul(vol, parseFloat(multiplier)), fix);
      }
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
          str = this.$t("order_list.limit_order");
          break;
        case 2:
          str = this.$t("order_list.market_order");
          break;
        case 3:
          str = this.$t("order_list.IOC");
          break;
        case 4:
          str = this.$t("order_list.FOK");
          break;
        case 5:
          str = this.$t("order_list.only_maker");
          break;
        case 6:
          str = this.$t("order_list.forced_lighten_up");
          break;
        case 7:
          str = this.$t("order_list.position_consolidation");
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
  destroyed() {
    clearInterval(this.getDataTimer);
    this.getDataTimer = null;
  }, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss">
//@import url(); 引入公共css类
.success_order_list_container {
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
}
.copy_order_id {
  cursor: pointer;
}
</style>
