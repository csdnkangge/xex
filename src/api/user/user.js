import request from '@/utils/request'
export default {
  // 用户列表
  getUserList(data) {
    return request({
      url: `/user/userList`,
      method: 'post',
      type: 'formdata',
      data
    })
  },
  // 更新用户信息
  updateUser(data) {
    return request({
      url: `/user/updateUser`,
      method: 'post',
      type: 'formdata',
      data
    })
  },
  // 新增用户信息
  createUser(data) {
    return request({
      url: `/user/addUser`,
      method: 'post',
      type: 'formdata',
      data
    })
  },
  changePassword(data) {
    return request({
      url: `/user/updatePassword`,
      method: 'post',
      type: 'formdata',
      data
    })
  }
}
