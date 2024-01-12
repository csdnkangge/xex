// 本地代理，解决跨域问题
module.exports = {
  proxy: {
    '/apis': {
      // 将www.exaple.com印射为/apis
      target: 'https://waasadmin.qyrx.me/', // 接口域名
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/apis': '' // 需要rewrite的,
      }
    }
  }
}
