<script>
export default {
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  render (h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    // if (icon) {
    //   const iconName = "iconfont icon-font meunicon " + icon;
    //   vnodes.push(<i class={iconName}></i>);
    // }
    if (icon) {
      const iconName = "iconfont meunicon " + icon;
      const active_src =
        "../../../../../static/menuSvg/" + icon + "_1" + ".svg";
      const src = "../../../../../static/menuSvg/" + icon + ".svg";
      // vnodes.push(<i class={iconName}></i>)
      // vnodes.push(<img src={shouye}></img>)
      if (icon && icon != "default") {
        vnodes.push(
          <iframe
            class="active"
            width="16"
            height="16"
            src={active_src}
            frameborder="0"
          ></iframe>
        );
        vnodes.push(
          <iframe
            class="no_active"
            width="16"
            height="16"
            src={src}
            frameborder="0"
          ></iframe>
        );
      } else {
        vnodes.push(<i class={iconName}></i>);
      }
    }
    if (title) {
      vnodes.push(<span slot="title" class='menuName'>{title}</span>);
    }
    return vnodes;
  }
};
</script>
<style lang="scss">
@import '../../../../styles/variables.scss';

.font-en {
  .el-submenu__title {
    font-size: 12px !important;
  }

  .el-menu-item {
    font-size: 12px !important;
    padding: 0 20px !important;
  }
}

.el-submenu__title {
  font-size: 16px;
  // color: #272536 !important;
}

.iconfont {
  /* margin-right: 5px; */
}

.meunicon {
  color: #fff !important;
}

.el-menu .iconfont {
  color: #b7b9c3 !important;
}

.iconfont.default {
  width: 6px;
  height: 6px;

  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  display: none;
}

.el-menu-item.is-active .iconfont.default {
  background: #fff;
}

.el-menu-item .menuName {
  padding-left: 6px;
  // font-weight: 600;
}

.el-submenu.is-active {
  .el-submenu__icon-arrow {
    font-weight: 800;
    color: #8F8EFF !important;
  }

  .iconfont {
    color: #8F8EFF !important;
  }
}

.el-submenu {
  .el-submenu__icon-arrow {
    font-weight: 800;
    color: #272536 !important;
  }
}

.router-link-active .is-active.el-menu-item {
  // border-left: 8px solid #707aff;
  color: #7473FF !important;
  font-family: PingFangSC-Semibold, PingFang SC !important;
  font-weight: 600;
  background: $menuHover !important;

  .menuName {
    padding-left: 6px;
    font-weight: 600;
  }

}

.el-submenu__title:hover {
  background: $menuHover !important;
}

.el-menu-item:hover {
  background: $menuHover !important;
}

.router-link-active .el-menu-item.is-active iframe.active {
  display: inline !important;
}
.router-link-active .el-menu-item.is-active iframe.no_active {
  display: none;
}
.menu-wrapper iframe {
  margin-right: 8px;
}
.menu-wrapper .iconfont.default {
  /* display: inline-block;
  width: 16px;
  height: 16px; */
  margin-right: 8px;
}
.el-submenu__title iframe.active {
  display: none !important;
}
.el-menu-item iframe.active {
  display: none;
}
.el-menu-item iframe.no_active {
  display: inline;
}
</style>
