import router from './router'
import Router from 'vue-router'
import store from './store'
import i18n from './lang'// 国际化
import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      if (!store.getters.getRoutersStatus) {
        store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
          router.matcher = new Router().matcher
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err.message)
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
      // if (!store.getters.getRoutersStatus) {
      //   // store.dispatch('GetInfo').then(res => { // 拉取user_info
      //   store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
      //     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      //   }).catch((err) => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error(err.message)
      //       next({ path: '/' })
      //     })
      //   })
      //   // })
      // } else {
      //   next()
      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})
export const setPageTitleTxt = (meta) => {

  if(i18n.locale=='en'){
    window.document.title = 'Partner System'
  }else if(i18n.locale=='zh'){
    window.document.title = '合伙人系统'
  }
}
router.afterEach(() => {
  setPageTitleTxt()
  NProgress.done() // 结束Progress
})
