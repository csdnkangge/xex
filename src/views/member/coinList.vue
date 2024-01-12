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
          filterable
        >
          <el-option
            v-for="item in coinList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
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
      <el-table-column
        prop="coinType"        
        label="币种"
        width="120"
        align="center"
      />
      <el-table-column prop="total" label="持仓量" align="center" />
      <el-table-column prop="count" label="持仓人数" align="center" />
      <el-table-column prop="selectTime" label="统计时间" align="center" />
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
import Api from "@/api/member/coin";
import { timeFormat, dateFormat } from "@/utils/index";
export default {
  name: "dataList",
  // import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    // 这里存放数据

    return {
     
      coinList:[],
      filterTime: "",
      baseInfo: {
        page: 1,
        pageSize: 10,
        coin:'',
        selectTime:''
      },
      // 数据总数
      total: 0,
      // 表格数据
      tableLoading: false,
      tableData: [],
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
      // let data = {};
      // // 移除空字段
      // Object.keys(this.baseInfo).forEach(key => {
      //   if (this.baseInfo[key] !== "") {
      //     data[key] = this.baseInfo[key];
      //   }
      // });
      if(!this.baseInfo.selectTime){
        this.$set(this.baseInfo, "selectTime","2021-12-30")
      }
      Api.getCoinStatisticsList(this.baseInfo).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },
    
   
    // 时间格式转化
    formatTime(row, col, val) {
      return timeFormat(val);
    },
    formatDate(row, col, val) {
      return dateFormat(val);
    },
    getCoinList() {
      Api.getCoinSymbolList().then(res => {
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
