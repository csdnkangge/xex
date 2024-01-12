import request from '@/utils/request'
export default {
  // 获取用户列表
  getMemberList(data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/user/list',
      data
    })
  },
  // 设置模拟用户
  setTestUser(data={}){    
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/user/addTestUser',
      data
    })
  },
  // 批量模拟用户
  setTestUsers(data={}){    
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/user/addTestUsers',
      data
    })
  },
  // 更新用户手机号
  updateMobile(data) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/user/update_mobile',
      data
    })
  },
  // 用户交易汇总
  getTradeList(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/user_trade_day',
      data
    })
  },
  // 用户流水汇总
  getDataList(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/user_data_statistics',
      data
    })
  },

  /**
   * 币种信息
   * @returns 
   */
  getCoinList(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/configCoinSymbol',
      data
    })
  },
  // 持仓汇总
  getBalanceList(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/balanceStatistics',
      data
    })
  }
  
}
