import Mock from 'mockjs'
import mockAPI from './mock'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}
// Mock.setup({
//   timeout: '350-600'
// })
// 登录相关
Mock.mock(/\/login\/login/, 'post', mockAPI.loginByUsername)
Mock.mock(/\/menu\/router/, 'get', mockAPI.getRouterList)
Mock.mock(/\/login\/logout/, 'post', mockAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', mockAPI.getUserInfo)
Mock.mock(/\/regions\/list\.*/, 'get', mockAPI.getRegion)
Mock.mock(/\/demo\/list\.*/, 'post', mockAPI.getDemoList)
export default Mock
