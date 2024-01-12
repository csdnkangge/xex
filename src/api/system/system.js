import request from '@/utils/request'
export default {
  // 获取配置列表
  getList(data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/config/listExchangeConfigKvStore',
      data
    })
  },
  // 更新参数
  updateConfig(data) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/config/updateConfigKvStore',
      data
    })
  },
  
}
