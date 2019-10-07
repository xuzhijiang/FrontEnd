<template>
  <div id="app">
    <!-- 用来显示组件的view -->
    <router-view/>
  </div>
</template>

<script>

export default {
    name: 'App',
    mounted() {
        // 监听页面刷新事件
      window.addEventListener("unload", this.saveState);
    },
    methods: {
        // 页面一刷新,就把当前的state保存到session storage中.
        saveState: function() {
            // session storage只能存放字符串,JSON.stringify转换成json格式的字符串.
            sessionStorage.setItem("userState", JSON.stringify(this.$store.state.User));
        }
    }
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
