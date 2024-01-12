import request from '@/utils/request'
export default {
  // 获取充值记录列表
  getDepositList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/record/deposit/list',
      data
    })
  },

  // 提币记录
  getWithdrawList(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/record/withdraw/list',
      data
    })
  },

  // getCoinList(data={}){
  //   return request({
  //     url: `/external/forwarding`,
  //     method: 'post',
  //     project: 'saas-house',
  //     code: '/api/record/getOpenCoinSymbol',
  //     data
  //   })
  // },
  
  // 合伙人下级用户
  getPartnerNext (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/partner_next_agent',
      data
    })
  },
  // 新增合伙人
  addPartner (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/partner_user_add_submit',
      data
    })
  },
  // 返佣记录列表
  getCommissionList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/bonus_day',
      data
    })
  },
  // 返佣明细
  getCommissionDetail (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/bonus_list',
      data
    })
  },
  // 下一级返佣明细
  getNextCommissionDetail (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/direct_next_agent_bonus_list',
      data
    })
  },
  // 统计信息
  getStaticInfo(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/stats',
      data
    })
  },
  // 邀请信息
  getInviteInfo(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/invite_info',
      data
    })
  },
  // 资金盈亏
  getProFitInfo(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/total_profit',
      data
    })
  },
  // 总净入金
  getIncomeprofitInfo(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/total_net_incomeprofit',
      data
    })
  },
  // 更新用户手机号
  updateRemark (data) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/partner/update_remark',
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
