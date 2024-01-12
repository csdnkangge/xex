<!-- 交易汇总 -->
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item>
        <el-input clearable placeholder="请输入内容" v-model="baseInfo.uidOrCode">
          <el-select
            v-model="baseInfo.optType"
            class="search-select"
            slot="prepend"
            placeholder="请选择"
            style="width:120px"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in keyTitle"
              :key="item.value"
            ></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchData"
          ></el-button>
        </el-input>
      </el-form-item>
      
      <el-form-item label="交易时间:">
        <el-date-picker
          v-model="filterTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      border
      style="width: 100%"
    >
      <el-table-column prop="itemDateStr" label="日期" width="100" align="center" />
      <el-table-column
        prop="symbol"
        label="币对"
        align="center"
        width="150"
      />
      <el-table-column prop="countryCode" label="国家代码" align="center"  />
      <el-table-column prop="uid" label="用户uid" align="center"  />
      <el-table-column prop="baseRate" label="基准货币USDT汇率" align="center" width="200"  />
      <el-table-column prop="quoteRate" label="计价货币对USDT汇率" align="center" width="200"  />
      <el-table-column prop="symbolVolume" label="总交易量" align="center" width="100"  />
      <el-table-column prop="buyAmount" label="买入量" align="center" width="100"  />
      <el-table-column prop="sellAmount" label="卖出量" align="center" width="100"  />
      <el-table-column prop="feeAmount" label="总交易手续费(折算USDT)" align="center" width="200"  />
      <el-table-column prop="buyRateAmount" label="买入量(折算USDT)" align="center" width="200"  />
      <el-table-column prop="sellRateAmount" label="卖出量(折算USDT)" align="center" width="200"  />
      <el-table-column prop="buyCount" label="买入笔数" align="center"  width="100" />
      <el-table-column prop="sellCount" label="卖出笔数" align="center" width="100"  />
      <el-table-column prop="firstBuyTimeStr" label="买单首次下单/成交时间" align="center" width="200"  />
      <el-table-column prop="lastBuyTimeStr" label="买单最后下单/成交时间" align="center" width="200" />
       <el-table-column prop="firstSellTimeStr" label="卖单首次下单/成交时间" align="center" width="200"  />
      <el-table-column prop="minBuyPrice" label="买入最低价(折算USDT)" align="center" width="200" />
      <el-table-column prop="maxBuyPrice" label="买入最高价(折算USDT)" align="center" width="200"  />
      <el-table-column prop="avgBuyPrice" label="买入平均价(折算USDT)" align="center" width="200" />
      <el-table-column prop="minSellPrice" label="卖出最低价(折算USDT)" align="center" width="200" />
      <el-table-column prop="maxSellPrice" label="卖出最高价(折算USDT)" align="center" width="200"/>
      <el-table-column prop="avgSellPrice" label="卖出平均价(折算USDT)" align="center" width="200" />
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
import Api from "@/api/member/member";
import { timeFormat } from "@/utils/index";
export default {
  name: "memberList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {   
    return {
     
      keyTitle: [
        { label: "uid", value: 1 },
        { label: "手机号", value: 2 },
        { label: "email", value: 3 }
      ],
      filterTime:'',
      baseInfo: {        
        page: 1,
        pageSize: 10,
        optType:1,
        uidOrCode: "",
        beginDateStr:'',
        endDateStr:''
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
        this.$set(this.baseInfo, 'beginDateStr', val[0])
        this.$set(this.baseInfo, 'endDateStr', val[1])
      } else {
        this.$set(this.baseInfo, 'beginDateStr', '')
        this.$set(this.baseInfo, 'endDateStr', '')
      }
      this.searchData()
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
      Api.getTradeList(this.baseInfo).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },
    add() {
      this.formData = {
        address: "",
        projectName: "",
        projectCode: "",
        remark: "",
        escription: "",
        id: "",
        status: 0
      };
      this.$set(this.dialogVisible, "merchant", true);
    },
    handleSubmit(form) {
      this.loading = true;
      this.$refs[form].validate(valid => {
        if (valid) {
          let {
            email,
            mobile,
            userCode,
            remark,
            userName,
            id,
            password,
            status
          } = this.formData;
          if (id) {
            Api.updateMerchant({
              email,
              mobile,
              userCode,
              remark,
              userName,
              id,
              status
            })
              .then(res => {
                console.log(res);
                this.$message({
                  message: "更新成功",
                  type: "success",
                  duration: 2 * 1000,
                  onClose: () => {
                    this.loading = false;
                    this.getTableData();
                    this.dialogVisible.merchant = false;
                  }
                });
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            Api.addMerchant({
              email,
              mobile,
              userCode,
              remark,
              userName,
              password,
              status
            })
              .then(res => {
                this.$message({
                  message: "创建成功",
                  type: "success",
                  duration: 2 * 1000,
                  onClose: () => {
                    this.loading = false;
                    this.getTableData();
                    this.dialogVisible.merchant = false;
                  }
                });
              })
              .catch(() => {
                this.loading = false;
              });
          }
        } else {
          this.loading = false;
          return false;
        }
      });
    },
    handleMenuCommand(command, row) {
      if (command == "mobile") {
        this.mobileFormData = {
          id: row.id,
          mobile: row.mobile
        };
        this.$prompt("请输入电话号码", "修改电话", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入电话号码",
          inputValue: row.mobile
        }).then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的电话号码是: " + value
          });
        });
      }
    },
    changeMobile(row) {
      this.mobileFormData = {
        id: row.id,
        mobileNumber: row.mobileNumber
      };
      this.$prompt("请输入电话号码", "修改电话", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入电话号码",
        inputValue: row.mobileNumber
      }).then(({ value }) => {
        this.$set(this.mobileFormData, "mobileNumber", value);
        Api.updateMobile(this.mobileFormData).then(res => {
          console.log(res);
          this.$message({
            message: "更新成功",
            type: "success",
            duration: 2 * 1000,
            onClose: () => {
              this.loading = false;
              this.getTableData();
            }
          });
        });
      });
    },
    handleEdit(row) {
      console.log()
    },
    formatWithdraw(row, col, val) {
      switch (Number(val)) {
        case 0:
          return "未审核";
        case 1:
          return "审核通过";
        case 2:
          return "审核拒绝";
        case 3:
          return "汇款中";
        case 4:
          return "已完成";
        case 5:
          return "汇款失败";
        case 6:
          return "已撤销";
        default:
          return "未知";
      }
    },
    formatUserType(row, col, val) {
      switch (Number(val)) {
        case 0:
          return "普通用户";
        case 1:
          return "公司用户";
        case 2:
          return "回购用户";
        case 3:
          return "机器人用户";
        case 4:
          return "做市用户";
        case 5:
          return "可疑用户";
        default:
          return "未知";
      }
    },
    // 时间格式转化
    formatTime(row, col, val) {
      return timeFormat(val);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.getSymbolList()
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
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
