// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 导入App这个组件
import App from './App'

// 导入路由
import router from './router'

// 导入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 使用异步请求需要安装axios:
// npm install axios -s --registry=https://registry.npm.taobao.org
import axios from 'axios'
// 原型链,相当于把Vue扩展了一下,Vue有了axios的功能
Vue.prototype.axios = axios;

import Vuex from 'vuex'
import store from './store'

Vue.use(Vuex);

// 安装ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = false

// 利用路由钩子 beforeEach 来判断用户是否登录，期间会用到 sessionStorage 存储功能
// 每次通过路由跳转,都可以走到这个方法中,所以我们可以通过 这个判断用户是否登录
router.beforeEach((to, from, next) => {
  // 获取用户登录状态
  let isLogin = sessionStorage.getItem("isLogin");

  // 如果要去的页面是logout的话
  if (to.path == '/logout') {
    // ,就清空SessionStorage
    sessionStorage.clear();

    // 跳转到登录页
    next({path: "/login"});
  }

  // 如果你要去登录页
  else if (to.path == "/login") {
    // 我看你是否已经登录,如果已经登录,就把你踢到首页
    if (isLogin == "true") {
      next({path: "/main"});
    }
  }

  // 如果为非登录状态
  else if (isLogin == null) {
    // 如果为非登录状态
    next({path: "/login"});
  }

  // 跳到下一个页面
  next();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 安装路由
  router,
  // 使用状态管理
  store,
  // 把组件App渲染到index.html中
  render: h => h(App)
});
