<!-- 系统配置 -->
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="语言类型">
        <el-input
          v-model="baseInfo.langKey"
          placeholder="请输入语言类型"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="searchData" />
        </el-input>
      </el-form-item>
      <el-form-item label="配置项">
        <el-input
          v-model="baseInfo.configKey"
          placeholder="请输入配置项"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="searchData" />
        </el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      border
      style="width: 100%"
    >
      <el-table-column prop="meta" label="配置名称" align="center" />
      <el-table-column prop="langKey" label="语言类型" align="center" />
      <el-table-column prop="configKey" label="配置项" align="center" />
      <el-table-column prop="content" label="内容" align="center" />

      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <page
      :total="total"
      :page.sync="baseInfo.page"
      :limit.sync="baseInfo.pageSize"
      @pagination="getTableData"
    ></page>
    <el-dialog
      title="配置编辑"
      :visible.sync="dialogVisible['config']"
      width="60%"
      center
    >
      <div class="clearfix">
        <el-col :span="20" :push="2">
          <el-form ref="configForm" :model="formData" label-width="120px">
            <el-form-item label="配置项" prop="title">
              <el-input v-model="formData.title" disabled />
            </el-form-item>
            <template v-if="formData.isJson">
              <el-form-item
                v-for="(item, index) in formData.value"
                :key="index"
                :label="index"
                :prop="index"
              >
                <el-input v-model="formData.value[index]" />
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="内容">
                <el-input v-model="formData.value" />
              </el-form-item>
            </template>
          </el-form>
        </el-col>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible.config = false">取 消</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click="handleSubmit('merchantForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Api from "@/api/system/language";
import page from "@/components/Page";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "languageList",
  components: { page },
  data() {
    //这里存放数据
    return {
      dialogVisible: {
        config: false
      },
      tableLoading: false,
      tableData: [],
      loading: false,
      formData: {},
      total: 0,
      baseInfo: {
        page: 1,
        pageSize: 10,
        mobile: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    searchData() {
      this.baseInfo.page = 1;
      this.getTableData();
    }, // 查询表格数据
    getTableData() {
      this.tableLoading = true;
      let data = {};
      // 移除空字段
      Object.keys(this.baseInfo).forEach(key => {
        if (this.baseInfo[key] !== "") {
          data[key] = this.baseInfo[key];
        }
      });
      Api.getList(data).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },
    handleEdit(row) {
      if (this.isJSON(row.value)) {
        let data = JSON.parse(row.value);
        this.formData = {
          title: row.title,
          id: row.id,
          isJson: true,
          value: {
            ...data
          }
        };
        this.$set(this.dialogVisible, "config", true);
      } else {
        this.formData = {
          title: row.meta,
          id: row.id,
          isJson: false,
          value: row.content
        };
        this.$set(this.dialogVisible, "config", true);
      }
    },
    handleSubmit() {
      let { id, value, isJson } = this.formData;
      if (isJson) {
        let data = {
          id,
          content: JSON.stringify(value)
        };
        this.loading = true;
        Api.updateConfig(data)
          .then(res => {
            this.getTableData();
            this.$message({
              message: "配置更新成功",
              type: "success",
              onClose: () => {
                this.loading = false;
                this.$set(this.dialogVisible, "config", false);
              }
            });
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        let data = {
          id,
          content:value
        };
        this.loading = true;
        Api.updateConfig(data)
          .then(res => {
            this.getTableData();
            this.$message({
              message: "配置更新成功",
              type: "success",
              onClose: () => {
                this.loading = false;
                this.$set(this.dialogVisible, "config", false);
              }
            });
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    isJSON(str) {
      if (typeof str == "string") {
        try {
          var obj = JSON.parse(str);
          if (typeof obj == "object" && obj) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          console.log("error：" + str + "!!!" + e);
          return false;
        }
      } else {
        return false;
      }
      console.log("It is not a string!");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTableData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
