const getters = {
  token: state => state.user.token,
  sessionKey: state => state.user.sessionKey,
  // menu: state => state.user.menu,
  sidebar: state => state.app.sidebar,
  // 缓存基础数据
  userinfo: state => state.permission.userinfo,
  walletId: state => state.permission.userinfo ? state.permission.userinfo.walletId : '',
  addRouters: state => state.permission.addRouters,
  getRoutersStatus: state => state.permission.getRoutersStatus,
  permission_routers: state => state.permission.routers,
  loginStatus: state => state.system.loginStatus,
  // 选项卡
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
