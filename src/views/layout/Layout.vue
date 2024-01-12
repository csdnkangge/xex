<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <!-- <tags-view></tags-view> -->
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain, TagsView } from '@/views/layout/components'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-header {
  padding: 0;
}
.app-wrapper{
  min-width:1000px;
  height: 100%;
}
.el-main {
  background-color: $bg;
  padding: 0;
}
.main-container{
  background: #F9F9f9;
}
.el-menu.el-menu--horizontal{
  border-bottom: none;
}

</style>
