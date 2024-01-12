import request from '@/utils/request'
export default {
  // 获取用户列表
  getAuthList(data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/auth/auth_realname',
      data
    })
  },
  // 认证详情
  authDetail(data) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/auth/auth_realname_detail',
      data
    })
  },
  // 更新实名认证状态
  updateAuthStatus(data) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/auth/update_auth_realname_status',
      data
    })
  },
  
}
