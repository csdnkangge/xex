import request from '@/utils/request'
export default {
  // 获取永续合约资产列表
  getFuturesAccount (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/futures_account',
      data
    })
  },
   // 获取钱包资产列表
   getExchangeAccount (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/exchange_account',
      data
    })
  },
  // 获取法币资产列表
  getOTCAccount (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/otc_account',
      data
    })
  },
  // 法币资产明细
  getOTCAccountRecord (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/otc_account_detail',
      data
    })
  },
  getOTCAccountDetail (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/merchant/otc_transaction_detail',
      data
    })
  },
  // 获取钱包资产明细
  getExchangeAccountDetail (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/exchange_account_detail',
      data
    })
  },
  // 更新用户备注
  updateRemark (data) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/update_remark',
      data
    })
  },

  

}
