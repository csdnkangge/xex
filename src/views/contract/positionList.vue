<!--  -->
<template>
  <el-card class="position_list_container">
    <div class="page_title">
      <span class="line"></span>{{ $t("position_list.title") }}
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
      <!-- <el-form-item :label="$t('position_list.position_id')" class="form-item">
        <el-input
          v-model="baseInfo.id"
          :placeholder="$t('position_list.position_id')"
          clearable
        />
      </el-form-item> -->
      <el-form-item
        :label="$t('position_list.contract_name')"
        class="form-select-item form-item"
      >
        <el-select
          v-model="baseInfo.symbol"
          filterable
          clearable
          :placeholder="$t('position_list.all')"
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
      <el-form-item class="search-form-item" label=""
        ><el-button class="search_btn" @click="searchData">{{
          $t("search")
        }}</el-button></el-form-item
      >
    </el-form>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      :row-style="rowStyle"
      style="width: 100%"
    >
      <!-- 用户uid -->
      <el-table-column
        :label="$t('uid')"
        width="120"
        prop="uid"
        align="center"
      />
      <!-- 合伙人uid -->
      <el-table-column
        :label="$t('partner_uid')"
        width="120"
        prop="partnerUid"
        align="center"
      />
      <!-- 仓位id -->
      <el-table-column
        :label="$t('position_list.position_id')"
        prop="id"
        width="100"
        align="center"
      />
      <!-- 合约名称 -->
      <el-table-column
        :label="$t('position_list.contract_name')"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.contractName }}</p>
        </template>
      </el-table-column>
      <!-- 杠杆 -->
      <el-table-column
        :label="$t('position_list.lever')"
        prop="leverageLevel"
        align="center"
      />
      <!-- 买卖方向 -->
      <el-table-column
        :label="$t('position_list.direction')"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <p
            :class="{
              red: scope.row.side === 'SELL',
              green: scope.row.side === 'BUY'
            }"
          >
            {{
              scope.row.side === "BUY"
                ? $t("position_list.open_long")
                : scope.row.side === "SELL"
                ? $t("position_list.open_short")
                : ""
            }}
          </p>
        </template>
      </el-table-column>
      <!-- 持仓数量 -->
      <el-table-column
        :label="$t('position_list.position_quantity')"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <p>
            {{
              setVolume(
                scope.row.volume,
                getDigit(parseFloat(scope.row.multiplier)),
                scope.row.multiplier
              )
            }}{{ setUnit(scope.row.contractName, 0) }}
          </p>
        </template>
      </el-table-column>
      <!-- 开仓均价 -->
      <el-table-column
        :label="$t('position_list.average_price')"
        width="140"
        align="center"
      >
        <template slot-scope="scope">
          {{ fixD(parseFloat(scope.row.openPrice), scope.row.pricePrecision) }}
          {{ setUnit(scope.row.contractName, 1) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('position_list.unsettled_p_l')"
        width="120px"
        align="center"
      >
        <template slot-scope="scope">
          {{
            fixD(
              parseFloat(scope.row.openRealizedAmount),
              scope.row.pricePrecision
            )
          }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('position_list.roi')"
        prop="returnRate"
        width="150px"
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.row.returnRate && scope.row.returnRate !== 0
              ? fixD(scope.row.returnRate * 100, 2) + "%"
              : "-"
          }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        :label="$t('position_list.liquidation_price')"
        width="130px"
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.row.reducePrice < 0 || scope.row.reducePrice == 0
              ? "-"
              : fixD(
                  parseFloat(scope.row.reducePrice),
                  scope.row.pricePrecision
                )
          }}
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('position_list.position_val')" prop="positionBalance" align="center">
        <template slot-scope="scope">
          {{
            fixD(
              parseFloat(scope.row.positionBalance),
              scope.row.pricePrecision
            )
          }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('position_list.profit_price')"  align="center" width="120">
        <template slot-scope="scope">
          {{ fixD(scope.row.profitPrice, scope.row.pricePrecision) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('position_list.stop_price')" align="center" width="120">
        <template slot-scope="scope">
          {{ fixD(scope.row.stopPrice, scope.row.pricePrecision) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('position_list.position_type')" align="center" width="120">
        <template slot-scope="scope">
          {{
            scope.row.positionType === 1
              ? $t('position_list.cross')
              : scope.row.positionType === 2
              ? $t('position_list.isolated')
              : $t('position_list.unknow')
          }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('position_list.open_time')"
        prop="ctime"
        align="center"
        width="170"
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
import Api from "@/api/contract/contract";
import {
  timeFormat,
  dateFormat,
  thousandsComma,
  fixD,
  getDigit,
  nul
} from "@/utils/index";

export default {
  name: "positionList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    return {
      contractList: [],
      dialogVisible: {
        detail: false
      },
      rowStyle: {
        backgroundColor: "#F9F9F9",
        borderRadius: "8px",
        overflow: "hidden"
      },
      filterTime: "",
      baseInfo: {
        page: 1,
        pageSize: 10,
        status: 1,
        symbol: ""
      },
      getDataTimer: null,
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
    // 合约列表
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
    // 表格数据筛选
    searchData() {
      // this.baseInfo.page = 1;
      this.getTableData();
    }, // 查询表格数据
    async getTableData(silence) {
      if (!silence) {
        this.tableLoading = true;
      }

      if (this.contractList.length == 0) {
        await Api.getContractList({}).then(res => {
          this.contractList = res.data;
        });
      }
      // if (this.contractList.length == 0) {
      //   await Api.getContractList({}).then(res => {
      //     res.data.unshift("全部");
      //     this.contractList = res.data;
      //     this.baseInfo.symbol = this.contractList[0];
      //   });
      // }
      let data = {};
      // 移除空字段
      Object.keys(this.baseInfo).forEach(key => {
        if (this.baseInfo[key] !== "") {
          if (key == "id") {
            data[key] = Number(this.baseInfo[key]);
          } else if (key === "symbol") {
            if (this.baseInfo[key] !== "全部") {
              data[key] = this.baseInfo[key];
            }
          } else {
            data[key] = this.baseInfo[key];
          }
        }
      });

      Api.getCotractPosition(data).then(res => {
        
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
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
    fixD(val, fix = 2) {
      return fixD(val, fix);
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
.position_list_container {
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
      background: linear-gradient(225deg, #DF69D1 0%, #976FFF 100%);
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
