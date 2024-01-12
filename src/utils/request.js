import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, getId } from '@/utils/auth'
import CryptoJS from 'crypto-js';
import router from '@/router'
let baseURL = window.g.baseUrl // 获取baseurl
// 创建axios实例
const service = axios.create({
  baseURL, // api的base_url
  // baseURL:'apis/',
  timeout: 15000, // 请求超时时间
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',

    // 'Platform': 'web',
    // 'Version': '1.0.0',
    // 'Authorization':''
  },
  withCredentials: false
})
// request拦截器
service.interceptors.request.use(
  config => {
    // 表单形式数据
    if (config.type && config.type.toLocaleLowerCase() == 'formdata') {
      config.headers['Content-Type'] = 'multipart/form-data'
      const fd = new FormData()
      for (const key in config.data) {
        fd.append(key, config.data[key])
      }
      config.data = fd
    }
    // 添加钱包id
    if (config.needWalletIds) {
      config.data.walletIds = store.getters.walletId ? store.getters.walletId.split() : []
    }
    if (config.project) {
      config.headers['project'] = config.project
    }
    if (config.code) {
      config.headers['code'] = config.code
    }
    if (store.getters.token) {
      config.headers['saas-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (store.getters.sessionKey) {
      let saasTime = new Date().getTime()
      let sessionKey = sessionStorage.getItem('sessionKey')
      config.headers['saas-sign'] = CryptoJS.MD5(`${saasTime}-${sessionKey}`).toString()
      config.headers['saas-time'] = saasTime
    }
    // if (config.url == '/login/login') {
    //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // }
    // config.headers['cancelToken']=store.getters.
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * statusCode为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // 无权限跳转到提示页面
    if (res.statusCode == 200) {
      return res
    } else if (res.statusCode == 401) {
      // 检测被登出或token过期
      store.commit('CHANGE_LOGIN_STATUS', false)
      MessageBox.confirm(
        '长时间未操作已自动登出，请重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          console.log('then')
          store.dispatch('FedLogOut').then(() => {
            store.commit('CHANGE_LOGIN_STATUS', true)
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
        .catch(() => {
          console.log('catch')
          store.commit('CHANGE_LOGIN_STATUS', true)
        })
      return Promise.reject('error')
    } else {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      // router.push({ name: 'login' })
      // return res
      return Promise.reject('error')
    }
  },
  error => {
    console.log(error.response)
    if (error.response) {

      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }

    //超时处理
    MessageBox.confirm(
      '请刷新页面',
      '请求超时',
      {
        confirmButtonText: '刷新页面',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      console.log('then')
      location.reload() // 为了重新实例化vue-router对象 避免bu
    })
  }
)
export default service
