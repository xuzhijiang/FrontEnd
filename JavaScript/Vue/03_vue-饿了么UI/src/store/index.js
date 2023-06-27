import Vue from 'vue'
import Vuex from 'vuex'
import User from './user'

Vue.use(Vuex);

// Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、
// 甚至是嵌套子模块——从上至下进行同样方式的分割
//
// 导出去,然后其他地方就调用this.$store就是用这个这里的Store
export default new Vuex.Store({
  modules: {
    // this.$store.state.user.username
    User
  }
});
