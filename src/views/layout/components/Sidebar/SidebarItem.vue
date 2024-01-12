<template>
  <div v-if="item.is_menu && item.children" class="menu-wrapper">
    <!-- <template v-if="hasOneShowingChild(item.children,item)">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item
            v-if="onlyOneChild.meta"
            :title="onlyOneChild.meta.label"
            :icon="onlyOneChild.meta.icon"
          />
        </el-menu-item>
      </app-link>
    </template> -->

    <el-submenu ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item
          v-if="item.meta"
          :title="item.meta.label[$i18n.locale ? $i18n.locale : 'zh']"
          :icon="item.meta.icon"
        />
      </template>

      <template v-for="child in item.children">
        <template v-if="child.is_menu">
          <sidebar-item
            v-if="child.children && child.children.length > 0"
            :is-nest="true"
            :item="child"
            :key="child.path"
            :base-path="resolvePath(child.path)"
            class="nest-menu"
          />

          <app-link v-else :to="resolvePath(child.path)" :key="child.name">
            <el-menu-item :index="resolvePath(child.path)">
              <item
                v-if="child.meta"
                :title="child.meta.label[$i18n.locale ? $i18n.locale : 'zh']"
                :icon="child.meta.icon"
              />
            </el-menu-item>
          </app-link>
        </template>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils";
import Item from "./Item";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";
export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    },
    routeObject: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    // 是否只有一个child
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (!item.is_menu) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      // 只有一个child的时候并且将其设为一级菜单
      // if (showingChildren.length === 1 && showingChildren[0].home === '1') {
      // 只有一个child的时候
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    linkTo(link) {
      // console.log(this.$route.path)
      this.$router.push({ name: link });
    },
    // 跳转地址
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath;
      }
      // console.log(path.resolve('/', this.basePath, routePath))
      return path.resolve(this.basePath, routePath);
    },
    // 判断是否为外部链接
    isExternalLink(routePath) {
      return isExternal(routePath);
    }
  }
};
</script>
<style lang="scss">
.el-submenu.is-active iframe.active {
  display: inline !important;
}
.el-submenu.is-active iframe.no_active {
  display: none;
}
</style>
