'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 整个build目录就是存放webpack的打包的相关配置文件

// 也就是在prod环境 或者 dev环境下,webpack如何给你打包的相关配置

// 比如: 
// webpack.dev.conf.js: 开发dev环境下的webpack打包相关配置
// webpack.base.conf.js是prod环境和dev环境的公共部分,所以单独抽离了出来.

module.exports = {
  context: path.resolve(__dirname, '../'),
  // 每一个应用程序都会有一个入口
  // 这里入口指向的是 ./src/main.js,这个js相当于我们java中的main方法,是程序的入口
  entry: {
    app: './src/main.js'
  },
  // 指定了webpack打包转换后的文件存放在哪个目录(比如把es6的转成es5的存在哪里?就是这里指定的.)
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // extensions: 扩展名/后缀名
    // webpack可以自动去寻找.js/.vue/.json结尾的文件,进行处理.
    extensions: ['.js', '.vue', '.json'],
    // 别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // 解析到了src目录,@以后就代表是src目录.以后其他地方会用到,这个比较重要
      '@': resolve('src'),
    }
  },
  module: {
    // 定义一些匹配后缀规则,假如我们引入文件没写后缀,就可以根据这个规则寻找匹配.
    // 比如我们引入了一个aa,没写后缀,我们定义了后缀匹配规则之后,就回去找是否有aa.vue, aa.js等.
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
