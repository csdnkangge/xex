
import request from '@/utils/request'
export default {
  // 获取提现列表
  getWithdrawList(data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/crypto/withdrawCrypto',
      data
    })
  },
  // 提现审核
  setWithdrawStatus(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/crypto/withdrawCryptoAudit',
      data
    })
  }
  
}
