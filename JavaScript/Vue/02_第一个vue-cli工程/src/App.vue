<template>
  <!-- template表示模板 -->
  <!-- 组件的东西都是放到template中的,template中有且只能有一个根元素,也就是说我们要摆布局的话,所有的其他元素都要放到这个根元素里面(本例就是div)-->
  <div id="app">
    <!-- router-link： 默认会被渲染成一个 <a> 标签，to 属性为指定链接 -->
    <router-link to="/">首页</router-link>
    <router-link to="/content">内容页</router-link>
    <!-- router-view： 用于渲染路由匹配到的组件 -->
    <!-- 因为是spa单页应用,所以这里配置一个路由视图,让router-link对应的组件的内容放到这个view中 -->
    <router-view />

    <!-- 在下面<style>内部添加上scoped之后就变成了<style scoped>: 意味着这段style样式只针对这个组件生效,如果不添加scoped就不行,这个是特别强调的点 -->
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
