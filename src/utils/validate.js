/**
 * Created by jiachenpan on 16/11/18.
 */
export function isvalidUsername(str) {
  const valid_map = ['admins', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}
/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}
/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}
/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
// 是否是数字
export function isNumber(value) {
  // var patrn = /^[0-9]*$/;
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
  if (value === '' || value == null) {
    return false
  } else if (isNaN(value)) {
    // if (patrn.exec(value) == null || value == "")
    return false
  } else {
    return true
  }
}
// 是否是字符串
export const isString = function(str) {
  return typeof str == 'string' && str.constructor == String
}
//
// 是否是正确邮箱
export function isEmail(val) {
  var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  var domains = [
    'qq.com',
    '163.com',
    'vip.163.com',
    '263.net',
    'yeah.net',
    'sohu.com',
    'sina.cn',
    'sina.com',
    'eyou.com',
    'gmail.com',
    'hotmail.com',
    '42du.cn'
  ]
  if (pattern.test(val)) {
    var domain = val.substring(val.indexOf('@') + 1)
    for (var i = 0; i < domains.length; i++) {
      if (domain == domains[i]) {
        return true
      }
    }
  }
  return false
}
// 是否电话号码
export function isPhone(str) {
  var myreg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/
  if (!myreg.test(str)) {
    return false
  } else {
    return true
  }
}
