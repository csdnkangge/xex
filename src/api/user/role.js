import request from '@/utils/request'
export default {
  // 获取用户角色
  getUserRole(data) {
    return request({
      url: `/userRole/userRoleInfo`,
      method: 'post',
      type: 'formdata',
      data
    })
  },
  // 更新用户角色
  updateUserRole(data) {
    return request({
      url: `/userRole/updateUserRole`,
      method: 'post',
      type: 'formdata',
      data
    })
  },
  // 角色列表
  getRoleList(data) {
    return request({
      url: `/role/roleList`,
      method: 'post',
      type: 'formdata',
      data
    })
  },
  // 更新角色
  updateRole(data) {
    return request({
      url: `/role/updateRole`,
      method: 'post',
      type: 'formdata',
      data
    })
  },
  // 新增角色
  addRole(data) {
    return request({
      url: `/role/addRole`,
      method: 'post',
      type: 'formdata',
      data
    })
  },
  // 角色路由信息
  getRoleResources(data) {
    return request({
      url: `/roleRes/roleResList`,
      method: 'post',
      type: 'formdata',
      data
    })
  },
  // 修改角色路由信息
  updateRoleRoute(data) {
    return request({
      url: `/roleRes/updateRoleRes`,
      method: 'post',
      type: 'formdata',
      data
    })
  }
}
