<template>
  <scroll-bar>
    <el-menu :class="$i18n.locale == 'en' ? 'font-en' : ''" :show-timeout="200" :default-active="$route.path"
      :collapse="isCollapse" mode="vertical" background-color="#fff" text-color="#272536" active-text-color="#7473FF">
      <div class="logo-text" :class="$i18n.locale == 'en' ? 'font-12' : ''" v-show="sidebar.opened">
        <!-- 合伙人管理系统 -->
        {{ $t("name") }}
      </div>
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"
        :route-object="route" />
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";
export default {
  components: { SidebarItem, ScrollBar },
  data () {
    return {};
  },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"]),
    isCollapse () {
      return !this.sidebar.opened;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.logo-text {
  color: #7473FF;
  text-align: center;
  margin: 40px auto;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 1px;

  img {
    border-radius: 100%;
    height: 80px;
    width: 80px;
  }
}

.font-12 {
  font-size: 12px !important;
}
</style>
