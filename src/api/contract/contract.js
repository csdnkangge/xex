import request from '@/utils/request'
export default {
  // 获取合约列表
  getContractList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/contract_config',
      data
    })
  },
  // 当前持仓列表
  getCotractPosition (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/co_position',
      data
    })
  },
  // 当前仓位合约平仓
  setClosePosition (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/close_position',
      data
    })
  },
  // 订单列表
  getContractOrderList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/order_list',
      data
    })
  },
  // 条件单列表
  getContractTriggerOrderList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/trigger_order_list',
      data
    })
  },
  // 成交汇总列表
  getSuccessOrderList(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/total_profit_list',
      data
    })
  },
  // 成交汇总统计
  getSuccessInfo(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/total_profit',
      data
    })
  },
  // 订单列表
  followOrderList (data={}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: `/api/trader/follow_order_list`,
      data
    })
  },
  // 更新用户手机号
  updateMobile (data) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/user/update_mobile',
      data
    })
  },
  // 用户交易汇总
  getTradeList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/user_trade_day',
      data
    })
  },
  // 用户流水汇总
  getDataList (data = {}) {
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
  getCoinList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/configCoinSymbol',
      data
    })
  },
  // 持仓汇总
  getBalanceList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/balanceStatistics',
      data
    })
  }

}
