<!--  -->
<template>
  <el-card class="commission_detail_container">
    <el-form :inline="true" label-position="top">
      <el-form-item :label="$t('uid')" class="form-item">
        <el-input v-model="baseInfo.uid" :placeholder="$t('uid')" clearable />
      </el-form-item>
      <el-form-item class="search-form-item" label=""
        ><el-button class="search_btn" @click="searchData">{{
          $t("search")
        }}</el-button></el-form-item
      >
    </el-form>
    <div class="table_title">
      {{ baseInfo.regesterTimeStart + " " + $t("commission_detail.title") }}
    </div>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      :row-style="rowStyle"
      style="width: 100%"
    >
      <el-table-column
        prop="uid"
        :label="$t('uid')"
        width="150"
        align="center"
      />
      <el-table-column
        :label="$t('commission_detail.identity')"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.row.rate && scope.row.rate > 0
              ? $t("commission_detail.partner_user")
              : $t("commission_detail.common_user")
          }}
        </template>
      </el-table-column>

      <el-table-column
        prop="nextRate"
        :label="$t('commission_detail.commission_ratio') + '(%)'"
        width="180"
        align="center"
      />
      <el-table-column
        prop="scale"
        :label="$t('commission_detail.contribution_commission_ratio') + '(%)'"
        width="260"
        align="center"
      />
      <el-table-column
        prop="feeSum"
        :label="$t('commission_detail.trade_fees')"
        align="center"
      />
      <el-table-column
        prop="amount"
        :label="$t('commission_detail.fee_rebate')"
        align="center"
      />

      <el-table-column
        :label="$t('commission_detail.update_date')"
        prop="ctime"
        align="center"
        :formatter="formatTime"
      />
    </el-table>
  </el-card>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import page from "@/components/Page";
import Api from "@/api/partner/partner";
import { timeFormat } from "@/utils/index";
export default {
  name: "commissionDetail",
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

      filterTime: "",
      baseInfo: {
        // page: 1,
        // pageSize: 10,
        // partnerUid: this.$route.query.id,
        uid: "",
        regesterTimeStart: "",
        regesterTimeEnd: ""
        // subUsername: "",
        // partnerUsername: ""
      },
      // 数据总数
      total: 0,
      // 表格数据
      tableLoading: false,
      tableData: [],
      sourceData: [],
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
      Api.getNextCommissionDetail(this.baseInfo)
        .then(res => {
          this.sourceData = res.data.data;
          // this.total = res.data.rows;
          this.tableLoading = false;
          this.tableData = this.filterData();
        })
        .catch(err => {
          this.tableLoading = false;
        });
    },
    filterData() {
      let data = this.sourceData.filter(item => {
        if (this.baseInfo.uid == "") {
          return true;
        } else if (item.uid == this.baseInfo.uid) {
          return true;
        }
      });
      return data;
    },
    // 时间格式转化
    formatTime(row, col, val) {
      return timeFormat(val);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    if (this.$route.query) {
      this.$set(this.baseInfo, "regesterTimeStart", this.$route.query.start);
      this.$set(this.baseInfo, "regesterTimeEnd", this.$route.query.end);
    }
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
.commission_detail_container {
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
  .table_title {
    color: #0e1337;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #0e1337;
    line-height: 25px;
    padding-left: 50px;
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
