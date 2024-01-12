<template>
  <section class="main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
      <!-- <router-view v-else :key="key"></router-view> -->
    </transition>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  data() {
    return {
      date: ''
    }
  },
  computed: {
    ...mapGetters(['cachedViews']),
    key() {
      return this.$route.fullPath
    }
  },
  watch: {
    // $route() {
    //   this.date = new Date().getTime()
    // }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.main {
  // height: 98%;
  // width: 98%;
  // margin-left: 1%;
  // margin-top: 1%;
  //  overflow:auto;
  width: 100%;
  height: 100%;
  padding: 8px;
}
</style>
