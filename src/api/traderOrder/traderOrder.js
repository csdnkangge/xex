import request from '@/utils/request'
export default {
  // 获取订单列表
  getFollowOrderList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/trader/follow_order_list',
      data
    })
  },
  // 交易员的跟单用户
  getFollowOrderDetail (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/trader/follow_order_detail',
      data
    })
  },
  // 交易员列表
  getFollowOrderUsers (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/trader/follow_order_users',
      data
    })
  },
  // 跟单员列表
  getFollowUserList (data = {}) {

    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/trader/follow_user_list',
      data
    })
  },
  // 交易员申请列表
  beTraderList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/trader/apply_become_trader_list',
      data
    })
  },
  // 同意交易员申请
  acceptApply (data={}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: `/api/trader/accept_apply`,
      data
    })
  },
  // 拒接交易员申请
  denyApply (data={}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: `/api/trader/deny_apply`,
      data
    })
  },
   // 取消交易员
   cancelTrader (data={}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: `/api/trader/cancel_trader_user`,
      data
    })
  },
  // 添加交易员
  addTrader (data={}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: `/api/trader/add_trader_user`,
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
