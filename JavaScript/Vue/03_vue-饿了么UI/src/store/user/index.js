const User = {

  // 下面是vuex中状态管理重要的4项东西
  // state是用来做状态存储
  // getters用来取值的,是一个计算 属性
  // mutations用来更新state的,是同步执行
  // actions是用来异步执行的.

  // 全局 state 状态对象，用于保存所有组件的公共数据
  // 页面刷新的时候,把state存在session storage中,取的时候,如果session storage中有,就解析session storage成json对象赋值给state
  // 否则就创建一个新的
  state : sessionStorage.getItem("userState") ? JSON.parse(sessionStorage.getItem("userState")) : {
    // 定义一个 user 对象
    // 在组件中是通过 this.$store.state.user 来获取
    user: {
      username: ''
    }
  },

  // 实时监听 state 值的最新状态，注意这里的 getters 可以理解为计算属性
  getters : {
    // 在组件中是通过 this.$store.getters.getUser 来获取
    getUser(state) {
      return state.user;
    }
  },

  // 定义改变 state 初始值的方法，这里是唯一可以改变 state 的地方
  // 缺点是mutations中的方法只能同步执行
  mutations : {
    // 在组件中是通过 this.$store.commit('updateUser', user); 方法来调用 mutations
    updateUser(state, user) {
      state.user = user;
    }
  },

  // 定义触发 mutations 里函数的方法，可以异步执行 mutations 里的函数
  // actions中 的方法都是异步执行的.
  actions : {
    // 在组件中是通过 this.$store.dispatch('asyncUpdateUser', user); 来调用 actions
    asyncUpdateUser(context, user) {
      // 异步的执行updateUser这个方法.后面是参数
      context.commit('updateUser', user);
    }
  }

};

// 把User暴露出来
export default User;
