'use strict'
const merge = require('webpack-merge')
// ./prod.env这个文件虽然没有指定后缀, 
// 由于我们的build目录下的webpack.base.conf.js中指定了后缀匹配规则,所以就会去找prod.env.js, prod.env.vue等文件.
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})

// config: 存放环境配置的目录
// dev.env.js: 开发环境
