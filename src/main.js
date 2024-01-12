import 'babel-polyfill'
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
import './assets/icon/iconfont.css'
import './styles/font.scss'
import VueDND from 'awe-dnd'
// 适配ie
require('es6-promise').polyfill()
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang'// 国际化
import '@/permission' // permission control
import fileApi from './api/export'
// import './assets/font-icon/iconfont.css'
// process.env.MOCK && require('@/mock') //mock模拟数据
Vue.prototype.$fileApi = fileApi
// 引入插件
Vue.use(ElementUI, { size: 'medium', i18n: (key, value) => i18n.t(key, value) })
Vue.use(VueDND)
// 关闭生产模式的提示
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
