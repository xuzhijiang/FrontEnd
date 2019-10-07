import Vue from 'vue'
// 导入路由插件
// vue-router 是一个插件包，所以我们还是需要用 npm/cnpm 来进行安装的:
// npm install vue-router --save-dev --registry=https://registry.npm.taobao.org
import Router from 'vue-router'
// @表示src目录.
// 这里是导入了Content这个组件
import Content from '@/components/Content'

// 如果在一个模块化工程中使用Router，必须要通过 Vue.use() 明确地安装路由功能：
// 安装路由
Vue.use(Router);

// 配置路由
// new一个Router对象,并且把它当成一个模块导出来,这样就可以在其他模块中导入了
export default new Router({
  // 路由是多个,所以是复数
  routes: [
    // 一个{}就代表是一个路由
    {
      name: 'content', // 路由名字
      path: '/content', // 路由路径
      component: Content //跳转到哪个组件
    }
  ]
});
