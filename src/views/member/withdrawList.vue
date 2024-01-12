<!--  -->
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="币种：">
        <el-select
          v-model="baseInfo.coin"
          placeholder="请选择币种"
          @change="searchData"
          clearable
        >
          <el-option
            v-for="item in coinList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-input clearable placeholder="请输入内容" v-model="baseInfo.searchValue">
          <el-select
            v-model="baseInfo.searchType"
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
      </el-form-item> -->

      <!-- <el-form-item label="统计时间:">
        <el-date-picker
          v-model="baseInfo.selectTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item> -->
    </el-form>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="提现单号" align="center" />
      <el-table-column prop="uid" label="UID" align="center" />
      <el-table-column prop="username" label="登录账号" align="center" />
      <el-table-column prop="symbol" label="币种" align="center" />
      <el-table-column
        prop="createdAt"
        :formatter="formatTime"
        label="提现时间"
        align="center"
      />
      <el-table-column label="审核时间" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.updatedAt">
            <div>{{ formatTime(0, 0, scope.row.updatedAt) }}</div>
            <div>(AdminId:{{ scope.row.opUid }})</div>
          </template>
          <template v-else><div>-</div></template>
        </template>
      </el-table-column>
      <el-table-column
        prop="payTime"
        :formatter="formatTime"
        label="支付时间"
        align="center"
      />
      <el-table-column
        prop="upTime"
        :formatter="formatTime"
        label="上链时间"
        align="center"
      />
      <el-table-column
        prop="amount"
        label="提现金额"
        align="center"
      />
      <el-table-column
        prop="fee"
        label="手续费"
        align="center"
      />
      <el-table-column
        prop="addressTo"
        label="提现地址"
        width="100"
        align="center"
      />
      <el-table-column prop="txid" label="TXID"  align="center" />
      <el-table-column prop="warningLevel" label="警告等级" align="center" />
      <el-table-column prop="warningLevelDesc" label="警告说明" align="center" />
      <el-table-column prop="refuseMsg" label="拒绝原因" align="center" />
      <el-table-column prop="wallet_status" label="waas反馈" align="center" />
      <el-table-column prop="statusDesc" label="提币状态" align="center" >
        <template slot-scope="scope">
          {{
            scope.row.status === 0
              ? "未审核"
              : scope.row.status === 1
              ? "审核通过"
              : scope.row.status === 2
              ? "审核拒绝"
              : scope.row.status === 3
              ? "汇款中"
               : scope.row.status === 4
              ? "已完成"
               : scope.row.status === 5
              ? "汇款失败"
              : "未知状态"
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120" align="center">
        <template slot-scope="scope">
           <el-dropdown
              split-button
              type="primary"
              @click="handleApproval(scope.row)"
              @command="e => handleMenuCommand(e, scope.row)"
              size="mini"
            >
              通过
              <el-dropdown-menu slot="dropdown">                
                <el-dropdown-item command="reject">拒绝</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

        </template>
      </el-table-column>
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
import Api from "@/api/member/withdraw";
import memberApi from "@/api/member/member";
import { timeFormat, dateFormat } from "@/utils/index";
export default {
  name: "czList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    // 这里存放数据

    return {
      dialogVisible: {
        merchant: false
      },
      keyTitle: [
        { label: "uid", value: 1 },
        { label: "手机号", value: 2 },
        { label: "email", value: 3 }
      ],
      coinList: [],
      filterTime: "",
      total: "",
      baseInfo: {
        page: 1,
        pageSize: 10
        // selectTime: "2021-12-30"
        // mobile: "",
        // keyType: "",
        // keyword: "",
        // userType: "",
        // ctimeEnd: "",
        // ctimeStart: ""
      },
      //       {
      //   "coin": "string",
      //   "keyType": 0,
      //   "keyword": "string",
      //   "limit": 0,
      //   "page": 0,
      //   "pageSize": 0,
      //   "selectedDateEnd": "string",
      //   "selectedDateStart": "string",
      //   "start": 0,
      //   "uid": 0
      // },
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
        this.$set(this.baseInfo, "selectedDateStart", val[0]);
        this.$set(this.baseInfo, "selectedDateEnd", val[1]);
      } else {
        this.$set(this.baseInfo, "selectedDateStart", "");
        this.$set(this.baseInfo, "selectedDateEnd", "");
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
      // if(!this.baseInfo.selectTime){
      //   this.$set(this.baseInfo,'selectTime','2021-12-30')
      // }
      Api.getWithdrawList(this.baseInfo).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },

    handleApproval(row) {
      this.$confirm('确定审核通过？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          Api.setWithdrawStatus({ id: row.id,status:1 }).then(res => {
            this.$message({
              message: '审核成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getTableData()
              }
            })
          })
        })
        .catch(() => {})
    },
    handleMenuCommand(e,row){
      console.log(e,row)
      if(e=='reject'){
        this.$prompt('请输入拒绝原因', '拒绝原因', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: '请输入拒绝原因',
          inputValue: row.refuseMsg
        }).then(({ value }) => {
          Api.setWithdrawStatus({ id: row.id,status:2,refuseMsg:value }).then(res => {
            this.$message({
              message: '审核成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getTableData()
              }
            })
          })
        })
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
    },
    formatDate(row, col, val) {
      return dateFormat(val);
    },
    getCoinList() {
      memberApi.getCoinList().then(res => {
        // console.log(res)
        this.coinList = res.data;
      });
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCoinList();
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
