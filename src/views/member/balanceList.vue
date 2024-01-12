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
      <el-form-item>
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
      </el-form-item>

      <el-form-item label="统计时间:">
        <el-date-picker
          v-model="baseInfo.selectTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          @change="searchData"
          :clearable="false"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      border
      style="width: 100%"
    >
      <el-table-column prop="uid" label="用户uid" align="center" />
      <el-table-column prop="coinType" label="币种" align="center" />
      
      <el-table-column prop="balance" label="数量" align="center" />
      <el-table-column prop="createdDate" :formatter="formatDate" label="统计时间" align="center" />
      <!-- <el-table-column prop="sellAccumulative" label="挂单" align="center"  /> -->
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
import { timeFormat, dateFormat } from "@/utils/index";
export default {
  name: "balanceList",
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
      baseInfo: {
        page: 1,
        pageSize: 10,
        selectTime: "2021-12-30"
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
      if(!this.baseInfo.selectTime){
        this.$set(this.baseInfo,'selectTime','2021-12-30')
      }
      Api.getBalanceList(this.baseInfo).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },

    handleEdit(row) {
      console.log();
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
      Api.getCoinList().then(res => {
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
