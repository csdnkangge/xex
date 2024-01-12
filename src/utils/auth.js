import Cookies from 'js-cookie'
const TokenKey = 'xcex-partner-admin-Token'
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token,{expires:1})
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setId(token, id) {
  return Cookies.set(token, id)
}
export function getId(token) {
  return Cookies.get(token)
}
export function removeId(key) {
  return Cookies.remove(key)
}
