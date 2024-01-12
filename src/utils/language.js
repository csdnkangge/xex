import Cookies from 'js-cookie'
const key = 'xcex-partner-language'
export function getLanguage() {
  return Cookies.get(key)
}
export function setLanguage(val) {
  return Cookies.set(key, val,{expires:1})
}
export function removeLanguage() {
  return Cookies.remove(key)
}
export function setId(token, id) {
  return Cookies.set(token, id)
}
export function getId(token) {
  return Cookies.get(token)
}
