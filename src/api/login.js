import request from '@/utils/request'
export function login(data) {
  return request({
    url: `/login/login`,
    method: 'post',
    data
  })
}
export function getInfo() {
  return request({
    url: '/rbac/admin/view',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/auth/admin/out',
    method: 'get'
  })
}
