import { asyncRouterMap, constantRouterMap } from '@/router'
import partnerApi from '../../api/partner/partner'
const _import = file => () => import('@/views/' + file + '.vue')
import router from '../../router'
function setRoutesComponent (routes) {
  for (const i in routes) {
    const route = routes[i]
    if (route.componentPath) {
      route.component = _import(`${route.componentPath}`)
      // route.component = resolve => require([`@/views/${route.componentPath}`], resolve)
      if (route.redirect !== null && route.children && route.children.length > 0) {
        route.redirect = route.children[0].path
      }
      route.meta = {
        icon: route.icon,
        label: route.label,
        cache: route.isCache,
        id: route.pid ? route.pid : route.id,
        is_menu: route.status
      }
    }
    if (route.children) {
      route.children = setRoutesComponent(route.children)
    }
  }
  return routes
}
function formatRouteData (routes) {
  routes = routes || []
  routes.forEach(item => {
    let { childList, name, componentName, pageUrl, status, sequence } = item
    item.label = name
    item.name = componentName
    item.children = childList
    item.path = pageUrl || ''
    item.is_menu = status
    item.sort = sequence
    if (item.children) {
      item.children = formatRouteData(item.children)
    }
  })
  return routes
}
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    getRoutersStatus: false,
    userinfo: {
      username: '',
      role: ''
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = setRoutesComponent(routers)
      state.getRoutersStatus = true
    },
    SET_USERINFO: (state, userinfo) => {
      state.userinfo = userinfo
    }
  },
  actions: {
    async GenerateRoutes ({ commit }) {
      const addRouter = [...constantRouterMap, ...asyncRouterMap]
      commit('SET_ROUTERS', addRouter)

      return await partnerApi.getStaticInfo().then(res1 => { // 获取合伙人中心数据
        commit('SET_USERINFO', res1.data)
      })
      // return new Promise((resolve,reject)=>{
      //   const addRouter = [...constantRouterMap, ...asyncRouterMap]
      //   commit('SET_ROUTERS', addRouter)
      //   return resolve()
      // })
    }
  }
}
export default permission
