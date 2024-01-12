import request from '@/utils/request'
export default {
  /**
   * 币种持仓汇总
   * @returns 
   */
  getCoinStatisticsList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/coinStatistics',
      data
    })
  },
  getCoinSymbolList (data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/configCoinSymbol',
      data
    })
  }

}
