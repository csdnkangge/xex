<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <draggable>
        <router-link
          ref='tag'
          class="tags-view-item"
          :class="isActive(tag)?'active':''"
          v-for="tag in Array.from(visitedViews)"
          :to="{path:tag.path,query:tag.query}"
          :key="tag.path"
          @contextmenu.prevent.native="openMenu(tag,$event)">
          {{tag.title}}
          <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
        </router-link>
      </draggable>
    </scroll-pane>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">关闭当前选项卡</li>
      <li @click="closeOthersTags">关闭其他选项卡</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>
<script>
  import ScrollPane from '@/components/ScrollPane'
  import draggable from 'vuedraggable'
  export default {
    components: { ScrollPane, draggable },
    data() {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {}
      }
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      }
    },
    watch: {
      $route() {
        this.addViewTags()
        this.moveToCurrentTag()
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      this.addViewTags()
    },
    methods: {
      // 检测route是否定义了name属性
      isActive(route) {
        return route.path === this.$route.path && route.name === this.$route.name
      },
      // 添加标签页
      addViewTags() {
        const { name } = this.$route
        if (name) {
          this.$store.dispatch('addView', this.$route)
        }
        return false
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag.$el)
              break
            }
          }
        })
      },
      closeSelectedTag(view) {
        // 首页无法删除
        this.$store.dispatch('delView', view).then(({ visitedViews }) => {
          if (this.isActive(view)) {
            const latestView = visitedViews.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView)
            } else {
              this.$router.push('/')
            }
          }
        })
      },
      closeOthersTags() {
        // this.$router.push(this.selectedTag.path)
        this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
          this.moveToCurrentTag()
        })
      },
      closeAllTags() {
        this.$store.dispatch('delAllViews')
        this.$router.push('/')
      },
      openMenu(tag, e) {
        this.visible = true
        this.selectedTag = tag
        this.left = e.clientX
        this.top = e.clientY
      },
      closeMenu() {
        this.visible = false
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

  .tags-view-container {
    .tags-view-wrapper {
      background: #f0f0f0;
      height: 34px;
      border-bottom: 1px solid #d8dce5;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
      .tags-view-item {
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        border-radius: 5px;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &:first-of-type {
          margin-left: 15px;
        }
        &:hover {
          box-shadow: 1px 1px 5px 1px #ccc;
        }
        &.active {
          background-color: #707AFF;
          color: #fff;
          border-color: #707AFF;
          &::before {
            content: '';
            /* background: #2d8cf0; */
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
            position: relative;
            top: -1px;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 999999999999;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }

</style>
<style rel="stylesheet/scss" lang="scss">
  /* reset element css of el-icon-close */
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(1);
          display: inline-block;
          vertical-align: -2px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }

</style>
