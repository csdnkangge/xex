<!--  -->
<template>
  <el-card>
    <el-form :inline="true">
      <!-- <el-form-item label="返佣日期:">
        <el-date-picker
          v-model="filterTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item> -->
      <el-form-item label="合约名称:">
        <el-select
          v-model="baseInfo.symbol"
          filterable
          placeholder="请选择"
          @change="searchData"
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
      <el-form-item label="用户UID:">
        <el-input v-model="baseInfo.uid" placeholder="用户UID" clearable>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchData"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="baseInfo.end"
          filterable
          placeholder="请选择当前or历史"
          @change="searchData"
        >
          <el-option label="当前条件委托" :value="1" />
          <el-option label="历史条件委托" :value="2" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      border
      style="width: 100%"
    >
      <el-table-column label="仓位ID" prop="id" align="center" width="180" />
      <el-table-column
        label="委托用户UID"
        prop="uid"
        align="center"
        width="120"
      />
      <el-table-column
        label="合伙人UID"
        prop="partnerUid"
        align="center"
        width="120"
      />
      <el-table-column
        label="合约名称"
        prop="contractName"
        align="center"
        width="140"
      />
      <el-table-column label="方向" align="center">
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
      <el-table-column label="杠杆" prop="leverage_level" align="center" />
      <el-table-column label="触发价格" prop="triggerPrice" align="center" />
      <el-table-column label="委托价格" prop="price_txt" align="center" />
      <el-table-column label="委托数量(张)" prop="count" align="center" />
      <el-table-column label="类型" prop="type_txt" align="center" />
      <!-- <el-table-column label="只减仓" prop="justReduce" align="center" /> -->
      <el-table-column
        label="提交时间"
        prop="mtime"
        align="center"
        width="160"
        :formatter="formatTime"
      />
      <el-table-column
        label="过期时间"
        prop="mtime"
        align="center"
        width="160"
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
import {
  timeFormat,
  dateFormat,
  thousandsComma,
  nul,
  division,
  fixD
} from "@/utils/index";

export default {
  name: "contractTriggerOrderList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    return {
      contractList: [],
      dialogVisible: {
        detail: false
      },

      filterTime: "",
      baseInfo: {
        page: 1,
        pageSize: 10,
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
      getDataTimer: null
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
    getContractList() {},
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
          this.contractList = res.data.map(item => item.replace("-", ""));
          this.baseInfo.symbol = this.contractList[0];
        });
      }

      Api.getContractTriggerOrderList(this.baseInfo).then(res => {
        if (res.data.data && res.data.data.length > 0) {
          this.tableData = res.data.data.map(item => {
            item.contractName = this.baseInfo.symbol || "";
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
            item.triggerPrice = this.thousandsComma(
              fixD(item.trigger_price, item.pricePrecision || 2)
            );
            // item.price_txt = null;
            // let volume = null;
            // if (item.type === 2 && Number(item.price) === 0) {
            //   item.price_txt = "市价"; // '市价';
            //   // 价值
            //   if (item.open === "OPEN") {
            //     // 反向
            //     let unit = this.contractInfo.base;
            //     const { volfix } = this.$store.state.future;
            //     let coinFix = volfix;
            //     // 正向
            //     if (this.contractSide === 1) {
            //       unit = this.priceUnit;
            //       coinFix = this.pricefix;
            //     }
            //     // volume = `${fixD(item.volume, coinFix)} ${unit}`;
            //   } else {
            //     // volume = `${this.setVolume(item.volume)} ${this.volUnit}`;
            //   }
            // } else {
            //   item.price_txt = this.thousandsComma(
            //     fixD(item.price, item.pricePrecision || 2)
            //   );
            //   // 委托数量
            //   // volume = `${this.setVolume(item.volume)} ${this.volUnit}`;
            // }

            item.price_txt = null;
            if (item.timeIn_force === 2 && Number(item.price) === 0) {
              item.price_txt = "市价"; // '市价';
            } else {
              item.price_txt = this.thousandsComma(
                fixD(item.price, item.pricePrecision || 2)
              );
            }
            item.count = `${this.thousandsComma(item.volume)}`;
            // item.avgPrice=item.price_precision
            //   ? this.thousandsComma(fixD(item.avg_price, item.price_precision))
            //   : "--";
            item.avgPrice = this.thousandsComma(fixD(item.avg_price, 2));
            item.type_txt = this.typeStatus(item.timeIn_force);
            item.justReduce = item.open === "CLOSE" ? "是" : "否";
            return item;
          });
        } else {
          this.tableData = [];
        }

        this.total = res.data.rows;
        this.tableLoading = false;
      });
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
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getContractList();
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
<style lang="scss" scoped>
//@import url(); 引入公共css类
.red {
  color: rgba(235, 77, 92, 1) !important;
}
.green {
  color: rgba(19, 184, 135, 1) !important;
}
</style>
