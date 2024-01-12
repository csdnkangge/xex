'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  EVN_CONFIG: '"dev"',
  BASE_API: '"http://192.168.192.158:8084/"',
  // BASE_API: '"https://merchant.loca.lt:443/"',
  // BASE_API: '"http://waasmht.qyrx.me/"',
  
  // BASE_API: '"http://120.78.195.131:8080/"',
  // BASE_API: '"http://waasmht.qyrx.me:80/"',
  // BASE_API: '"https://waasadmin.zwwbit.com/"',  
  MOCK: 'false',
})
