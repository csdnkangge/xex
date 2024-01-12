<!--  -->
<template>
  <el-card class="next_container">
    <div class="page_title">
      <span class="line"></span>{{ $t("partner_next.title") }}
    </div>
    <el-form :inline="true" label-position="top">
      <el-form-item :label="$t('uid')" class="form-item">
        <el-input v-model="baseInfo.subUid" :placeholder="$t('uid')" clear="form-input" clearable />
      </el-form-item>
      <el-form-item :label="$t('invite_uid')" class="form-item">
        <el-input v-model="baseInfo.inviteUid" :placeholder="$t('invite_uid')" clearable />
      </el-form-item>
      <el-form-item :label="$t('partner_uid')" class="form-item">
        <el-input v-model="baseInfo.partnerUid" :placeholder="$t('partner_uid')" clearable />
      </el-form-item>
      <!-- <el-form-item :label="$t('partner_next.real_name')" class="form-item">
        <el-input
          v-model="baseInfo.realName"
          :placeholder="$t('partner_next.real_name')"
          clearable
        />
      </el-form-item>       -->
      <el-form-item :label="$t('register_date')" class="date-form-item">
        <el-date-picker v-model="filterTime" type="daterange" range-separator="-" :start-placeholder="$t('start_time')"
          :end-placeholder="$t('end_time')" value-format="yyyy-MM-dd"></el-date-picker>
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
    <el-table :data="tableData" v-loading="tableLoading" style="width: 100%" :row-style="rowStyle">
      <el-table-column :label="$t('partner_next.account')" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.email || scope.row.mobileNumber }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="rate" label="上级返佣比例(%)" align="center" /> -->
      <el-table-column :label="$t('partner_next.identity')" align="center">
        <template slot-scope="scope">
          {{
            scope.row.rate && scope.row.rate > 0
            ? $t("partner_next.partner_user")
            : $t("partner_next.common_user")
          }}
        </template>
      </el-table-column>
      <el-table-column prop="subUid" :label="$t('uid')" width="150" align="center" />

      <el-table-column prop="directPartnerUId" :label="$t('invite_uid')" width="150" align="center" />
      <el-table-column :label="$t('partner_uid')" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.readPartnerUid ? scope.row.readPartnerUid : "--" }}
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('partner_next.real_name')" align="center">
        <template slot-scope="scope">
          {{ scope.row.userName ? scope.row.userName : "--" }}
        </template>
      </el-table-column> -->
      <el-table-column prop="cryptoDepositAmount" :label="$t('partner_next.total_deposit') + '(USDT)'" width="150"
        align="center" />
      <el-table-column prop="cryptoWithdrawAmount" :label="$t('partner_next.total_withdraw') + '(USDT)'" width="150"
        align="center" />
      <el-table-column prop="fiatDepositAmount" :label="$t('partner_next.fiat_deposit') + '(USDT)'" width="150"
        align="center" />
      <!-- <el-table-column
        prop="historyRealizedAmount"        
        :label="$t('partner_next.zjyk')+'(USDT)'"
        width="150"
        align="center"
      /> -->
      <el-table-column :label="$t('register_date')" prop="regesterTime" align="center" width="170"
        :formatter="formatTime" />
      <el-table-column prop="remark" :label="$t('remark')" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark ? scope.row.remark : "--" }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('operate')" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="changeRemark(scope.row)">{{
            $t("partner_next.edit_remark")
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible['remark']" custom-class="poster_mask" width="740px" center>
      <div class="remark_title" slot="title">
        <div class="title">
          <span class="point"></span>{{ $t("remark_dialog.edit_remark_title") }}
        </div>
      </div>
      <div class="remark_main">
        <div class="label">{{ $t("remark_dialog.remarks") }}</div>
        <div class="input_box">
          <el-input type="textarea" :placeholder="$t('remark_dialog.remark_placeholder')" v-model="remarkFormData.remark"
            maxlength="50" show-word-limit>
          </el-input>
        </div>
        <el-button class="submit_btn" :loading="loading" @click="submitRemark">
          <span>{{ $t("remark_dialog.add") }}</span></el-button>
      </div>
    </el-dialog>
    <page :total="total" :page.sync="baseInfo.page" :limit.sync="baseInfo.pageSize" @pagination="getTableData"></page>
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
  name: "partnerNext",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data () {
    return {
      dialogVisible: {
        remark: false
      },
      rowStyle: {
        backgroundColor: "#F9F9F9",
        borderRadius: "8px",
        overflow: "hidden"
      },
      remarkFormData: {
        id: "",
        remark: ""
      },

      filterTime: "",
      baseInfo: {
        page: 1,
        pageSize: 10,
        regesterTimeStart: "",
        regesterTimeEnd: "",
        subUid: "",
        partnerUid: "",
        inviteUid: ""
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
    filterTime (val) {
      if (val && val.length > 0) {
        // let time = val[0] + ',' + val[1]
        this.$set(this.baseInfo, "regesterTimeStart", val[0]);
        this.$set(this.baseInfo, "regesterTimeEnd", val[1]);
      } else {
        this.$set(this.baseInfo, "regesterTimeStart", "");
        this.$set(this.baseInfo, "regesterTimeEnd", "");
      }
      // this.searchData();
    }
  },
  // 方法集合
  methods: {
    setDay (day) {
      if (day == "today") {
        let day = dateFormat(moment());
        this.filterTime = [day, day];
      }
      if (day == "yesterday") {
        let day = dateFormat(moment().subtract(1, "d"));
        this.filterTime = [day, day];
      }
    },
    changeRemark (row) {
      this.remarkFormData = {
        id: row.id,
        remark: row.remark
      };
      this.$set(this.dialogVisible, "remark", true);
    },
    submitRemark () {
      this.loading = true;
      Api.updateRemark(this.remarkFormData)
        .then(res => {
          this.$message({
            message: this.$t("remark_dialog.success_update_remark"),
            type: "success",
            duration: 2 * 1000,
            onClose: () => {
              this.$set(this.dialogVisible, "remark", false);
              this.loading = false;
              this.getTableData();
            }
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 表格数据筛选
    searchData () {
      this.baseInfo.page = 1;
      this.getTableData();
    }, // 查询表格数据
    getTableData () {
      this.tableLoading = true;
      // let data = {};
      // // 移除空字段
      // Object.keys(this.baseInfo).forEach(key => {
      //   if (this.baseInfo[key] !== "") {
      //     data[key] = this.baseInfo[key];
      //   }
      // });
      Api.getPartnerNext(this.baseInfo).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },

    // 时间格式转化
    formatTime (row, col, val) {
      return timeFormat(val);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.getSymbolList()
    this.getTableData();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss">
//@import url(); 引入公共css类
.next_container {
  border-radius: 8px;

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
      width: 68px;
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
      background: linear-gradient(225deg, #DF69D1 0%, #976FFF 100%);
      color: #fff;
      border: none;
    }
  }

  .el-table__body {
    border-collapse: separate;
    border-spacing: 0 8px;
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

  .remark_title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #272536;
    font-size: 24px;
    line-height: 33px;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .point {
      width: 9px;
      display: inline-block;
      height: 9px;
      border-radius: 50%;
      overflow: hidden;
      background: #272536;
      margin-right: 8px;
    }
  }

  .poster_mask {
    background: #fff;
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
        background: linear-gradient(225deg, #DF69D1 0%, #976FFF 100%);
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
