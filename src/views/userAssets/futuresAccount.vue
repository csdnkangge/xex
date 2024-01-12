<!--  -->

<template>
  <el-card class="futures_account_container">
    <div class="page_title">
      <span class="line"></span>{{ $t("contract_asset.title") }}
    </div>
    <el-form :inline="true" label-position="top">
      <el-form-item :label="$t('uid')" class="form-item">
        <el-input
          v-model="baseInfo.subUid"
          :placeholder="$t('uid')"
          clear="form-input"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('partner_uid')" class="form-item">
        <el-input
          v-model="baseInfo.partnerUid"
          :placeholder="$t('partner_uid')"
          clearable
        />
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
      style="width: 100%"
      :row-style="rowStyle"
    >
      <el-table-column :label="$t('contract_asset.account')" align="center">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>

      <el-table-column
        prop="uid"
        :label="$t('uid')"
        width="150"
        align="center"
      />

      <el-table-column
        prop="partnerUid"
        :label="$t('partner_uid')"
        width="150"
        align="center"
      />
      <el-table-column
        prop="total"
        :label="$t('contract_asset.total_assets')"
        width="200"
        align="center"
      />
      <el-table-column
        prop="free"
        :label="$t('contract_asset.available')"
        width="200"
        align="center"
      />
      <el-table-column
        prop="frozen"
        :label="$t('contract_asset.freeze')"
        width="200"
        align="center"
      />
      <el-table-column prop="remark" :label="$t('remark')" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark ? scope.row.remark : "--" }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('operate')" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="changeRemark(scope.row)">{{
            $t("contract_asset.edit_remark")
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible['remark']"
      custom-class="poster_mask"
      width="740px"
      center
    >
      <div class="remark_title" slot="title">
        <div class="title">
          <span class="point"></span>{{ $t("remark_dialog.edit_remark_title") }}
        </div>
      </div>
      <div class="remark_main">
        <div class="label">{{ $t("remark_dialog.remarks") }}</div>
        <div class="input_box">
          <el-input
            type="textarea"
            :placeholder="$t('remark_dialog.remark_placeholder')"
            v-model="remarkFormData.remark"
            maxlength="50"
            show-word-limit
          >
          </el-input>
        </div>
        <el-button class="submit_btn" :loading="loading" @click="submitRemark">
          <span>{{ $t("remark_dialog.add") }}</span></el-button
        >
      </div>
    </el-dialog>
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
  name: "futuresAccount",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    return {
      dialogVisible: {
        remark: false
      },
      remarkFormData: {
        id: "",
        remark: ""
      },
      rowStyle: {
        backgroundColor: "#F5F6F9",
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
        subUid: "",
        partnerUid: ""
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
    }, // 查询表格数据
    async getTableData() {
      this.tableLoading = true;

      let data = {};
      Object.keys(this.baseInfo).forEach(key => {
        if (this.baseInfo[key] !== "") {
          if (key !== "symbol") {
            data[key] = this.baseInfo[key];
          } else {
            if (this.baseInfo[key] === "全部") {
              data[key] = "all";
            } else {
              data[key] = this.baseInfo[key];
            }
          }
        }
      });
      Api.getFuturesAccount(data).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },
    changeRemark(row) {
      this.remarkFormData = {
        subUid: row.uid,
        remark: row.remark,
        partnerUid: this.$store.getters.userinfo.uid
      };
      this.$set(this.dialogVisible, "remark", true);
    },
    submitRemark() {
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

.futures_account_container {
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
