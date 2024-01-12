<!--  -->
<template>
  <el-card>
    <el-form :inline="true">
     
     <el-form-item>
      <el-button type="primary" @click="$router.push({name:'noticeDetail'})">新增公告</el-button>
     </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      border
      style="width: 100%"
    >
      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column prop="lang" label="语言" align="center" />
      <el-table-column
        prop="stime"
        :formatter="formatTime"
        label="发布时间"      
        align="center"
      />
      <el-table-column
        prop="mtime"
        :formatter="formatTime"
        label="更新时间"        
        align="center"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)" >编辑</el-button>
          <el-button type="text" @click="handleSetTop(scope.row)">置顶</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
          
        </template>
      </el-table-column>
      <!-- <el-table-column prop="email" label="邮箱" align="center" /> -->
      <!-- <el-table-column prop="balance" label="数量" align="center" /> -->
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
import Api from "@/api/content/notice";
// import memberApi from "@/api/member/notice";
import { timeFormat, dateFormat } from "@/utils/index";
export default {
  name: "noticeList",
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
      Api.getNoticeList(this.baseInfo).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },
    handleSetTop(row){
      Api.setTop({id:row.id}).then(res=>{
        console.log(res)
        this.$message({
          message:'置顶成功',
          type:'success'
        })
        this.getTableData()
      })
    },
    handleEdit(row) {
      console.log(row.id); 
      this.$router.push({
        name:'noticeDetail',
        query:{
          id:row.id
        }
      })
    },
    handleDelete(row){
      this.$confirm('确定删除该公告？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          Api.deleteNotice( [row.id]).then(res => {
            this.$message({
              message: '删除成功',
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
    // 时间格式转化
    formatTime(row, col, val) {
      return timeFormat(val);
    },
    
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
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
