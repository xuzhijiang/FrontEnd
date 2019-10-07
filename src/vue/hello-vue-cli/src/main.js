// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import就是es6写法.
// 前面这个import Vue这个Vue名字自己可以随便起,from后面就是自己实实在在引进了的东西了.可以通过node_modules目录看到vue这个目录
import Vue from 'vue'
import App from './App'
// webpack会自动寻找./router路径下的js文件,webpack会把这些js文件当成模块打包进来
// 这里是导入路由配置
import router from './router'

// main.js是程序入口
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // 操作的是项目根目录下index.html中的id属性为app的元素.
  el: '#app',
  // 页面就是组件的容器,所以项目根目录下的index.html这个页面可以包含很多组件
  // 添加上面引入的App这个组件到index.html这个页面容器中.
  components: { App },
  // 配置路由
  // 告诉Vue,要使用哪个路由
  router,
  template: '<App/>'
})
