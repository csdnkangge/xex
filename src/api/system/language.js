import request from '@/utils/request'
export default {
  // 获取语言列表
  getList(data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/config/langList',
      data
    })
  },
  // 更新语言配置
  updateConfig(data) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/config/langUpdate',
      data
    })
  },
  
}
