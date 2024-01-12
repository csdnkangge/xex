import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import system from './modules/system'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    permission,
    system
  },
  getters
})
export default store
