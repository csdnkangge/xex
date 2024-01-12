
import request from '@/utils/request'
export default {
  // 获取充值列表
  getDepositList(data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/crypto/depositCrypto',
      data
    })
  }
  
}
