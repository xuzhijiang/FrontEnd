// export导出的意思: export {}就是要进行批量导出.{}中可以包含多个要导出的对象.
//export不仅可以导出对象，一切JS变量都可以导出。比如：基本类型变量、函数、数组、对象。
// export {util}


// 导出更加快速的写法: 相当于既声明了一个对象util,同时把它导出了
// 当然这种形式的导出,如果在其他地方导入的话,就必须要这么写:
// import util from "./hello.js"
// 不能自己乱起名,这样就是错误的: import abc from "./hello.js"
// export const util = {
//     sum(a, b) {
//         return a + b;
//     }
// }

// 如果导出之后,其他地方导入的时候,想要自己起导入的名字,比如我就想在main.js这样导入:
// import abc from "./hello.js", 那么就需要这样来导出,以后其他地方就可以随意起名字导入了:

export default { // default的意思就是相当于我们导出了一个对象,我们没有给这个导出的对象起名字,你导入的时候就可以随意起名字,比如abc
    sum(a, b) {
        return a + b;
    }
}

// 现在这些导入导出操作无法直接测试,因为这些都是es6的语法,有的浏览器不支持,还需要转换工具转成浏览器认识的语法.