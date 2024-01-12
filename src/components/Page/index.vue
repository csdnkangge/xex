<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination :background="background" :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout"
      :page-sizes="pageSizes" :total="total" v-bind="$attrs" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50];
      }
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page;
      },
      set (val) {
        this.$emit("update:page", val);
      }
    },
    pageSize: {
      get () {
        return this.limit;
      },
      set (val) {
        this.$emit("update:limit", val);
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange (val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    }
  }
};
</script>

<style lang="scss">
.pagination-container {
  background: #fff;
  padding: 16px;
  text-align: center;
}

.pagination-container.hidden {
  display: none;
}

.pagination-container {

  // .el-pagination span:not([class*=suffix]), .el-pagination button{
  //   height: 32px;
  //   line-height: 32px;
  // }
  // .el-pager li{
  //   height: 32px;
  //   line-height: 32px;
  // }
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .el-pager li {
    // min-width:32px;
    border-radius: 4px;
  }
}

.pagination-container .el-pager .number.active {
  background:  linear-gradient(225deg, #DF69D1 0%, #976FFF 100%);
}
</style>
