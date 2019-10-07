<template>
    <div>
      用户列表
      {{ id }}
    </div>
</template>

<script>
    export default {
        // 设置id属性,这样就可以在template中直接使用了
        props: ["id"],
        name: "UserList",
        // beforeRouteEnter：在进入路由前执行,注意参数必须传
        // 参数说明：
        // to：路由将要跳转的路径信息
        // from：路径跳转前的路径信息
        // next：路由的控制参数
        // next() 跳入下一个页面
        // next('/path') 改变路由的跳转方向，使其跳到另一个路由
        // next(false) 返回原来的页面
        // next((vm)=>{}) 仅在 beforeRouteEnter 中可用，vm 是组件实例
        beforeRouteEnter: function(to, from, next) {
            console.log("页面进入前");
            // 跳到下一个页面,这样才可以继续执行
            // 只有在next中才可以拿到Vue实例,这是因为当发现页面渲染完成了,就把vue的实例返回给你
            // 拿到实例之后,做一些初始化事情
            // 注意，一定要在 next 中请求调用vue实例的方法，因为在beforeRouterEnter方法调用时, Vue 实例还没有创建，
            // 此时无法获取到 this 对象(vue实例)，
            // 在这里使用官方提供的回调函数拿到当前实例
            next(vm => { // 会在回调中调用
                // 没有vue实例是调用不了这个方法的.
                vm.getData();
            });
        },
        // beforeRouteLeave：在离开路由前执行,注意参数必须传
        beforeRouteLeave: function(to, from, next) {
            console.log("页面离开前");
            // 跳到下一个页面,这样才可以继续执行
            next();
        },
        methods: {
            getData: function() {
                // 因为main.js中的Vue.prototype.axios = axios;
                // 所以才可以this.axios
                this.axios({
                    type: 'get',
                    url: 'http://localhost:8080/static/data.json'
                }).then(response => {
                        console.log(response);
                    }
                ).catch(error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>
