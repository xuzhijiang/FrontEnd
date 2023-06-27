import Vue from 'vue'
import Router from 'vue-router'

// 导入我们自定义的组件
import Login from "@/views/Login"
import Main from '@/views/Main'

// 用于嵌套的路由组件
import UserProfile from "@/views/user/Profile"
import UserList from "@/views/user/List"
import UserAdd from "@/views/user/Add"
import NotFound from "@/views/user/404"

Vue.use(Router);

export default new Router({
  mode: 'history', // 默认是hash模式(路径上是#),可以改成路由模式,也就是history.,改完后,访问就不用带#
  routes: [
    // 配置2个路由
    {
      // 登录页
      path: '/login', // http://localhost:8080/#/login
      name: 'Login',
      component: Login
    },
    {
      // 首页
      path: '/main', // http://localhost:8080/#/main
      name: 'Main',
      component: Main,
      // 配置嵌套路由(嵌套路由会在Main这个组件中显示)
      // 嵌套路由又称子路由，在实际应用中，通常由多层嵌套的组件组合而成
      // 增加了 children 数组配置，用于在Main组件下设置嵌套路由
      children: [
        {path: '/user/profile', component: UserProfile}, // http://localhost:8080/#/user/profile
        {path: '/user/list/:id', component: UserList, props: true}, // props:true意思是我允许使用props的方式传参数
        // UserAdd为在路由中的名字,可以和组件中的名字不同.
        {path: '/user/add/:id', component: UserAdd, name: 'UserAdd'}//主要是在 path 属性中增加了 :id 这样的占位符,进行参数传递
      ]
    },
    {
      path: "/home", // 路径是home,重定向到main
      redirect: "/main"
    },
    {
      path: "*", // 匹配其他没有路由映射的页面.也就是404
      component: NotFound
    }
  ]
});
