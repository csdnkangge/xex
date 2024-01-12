import request from '@/utils/request'
export default {
  // 当前用户信息
  getCurUserInfo(data) {
    return request({
      url: `/merchant/merchantInfo`,
      method: 'post',
      data
    })
  },
  // 绑定地址
  bindAddress(data) {
    return request({
      url: `/merchant/bindAddress`,
      method: 'post',
      // type: 'formdata',
      data
    })
  }
}
