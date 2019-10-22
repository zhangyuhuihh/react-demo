const proxy = require('http-proxy-middleware')
const express = require('express')

module.exports = function expressMiddleware(router) {
  router.use(
    '/',
    proxy('/oa/web', {
      target: 'http://192.168.200.248:20002/oa/web',
      changeOrigin: true,
      pathRewrite: {
        '^/oa/web': ''
      }
    })
  )
}
