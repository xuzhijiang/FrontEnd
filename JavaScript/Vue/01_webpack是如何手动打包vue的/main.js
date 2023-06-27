/**
 * Created by Administrator on 2018/6/9.
 */
//导入model01.js
var {add} = require("./model01")
var Vue = require("./vue.min")
var VM = new Vue({
    el:'#app',//vm接管了app区域的管理
    data:{//model数据
        name:'黑马程序员',
        num1:0,
        num2:0,
        result:0,
        url:'http://www.itcast.cn',
        size:11
    },
    methods:{
        change:function () {
            this.result = add(Number.parseInt(this.num1),Number.parseInt(this.num2))
            // this.result = Number.parseInt(this.num1)+Number.parseInt(this.num2)
            //alert("计算结果："+this.result)
        }
    }
});

// 说明:
// 在webpacktest01目录下创建main.js，main.js是本程序的js主文件,main.js是给webpack来看的.

// 执行webpack main.js build.js ，这段指令表示将main.js打包输出为 build.js文件
// 执行完成，观察程序目录是否出现build.js

// 这个命令的意思: webpakc会依据main.js来打包. 也就是webpack根据指定的入口文件main.js,打出了build.js这个文件,
// 这个build.js包含了vue这个库,包含了model01.js, 然后vue_02.html引入了build.js这个文件,间接包含了model01.js和vue.js的功能

// 执行这个命令的前提
// 安装webpack: cnpm install webpack@3.6.0 -g
// 测试是否 webpack安装成功: webpack

// 如果打包命令执行不成功,可以用windows的cmd来执行打包.