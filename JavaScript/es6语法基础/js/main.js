import abc from "./hello.js" // 只有hello.js中已经export导出的东西,这里才可以import导入

// 批量导入user.js中已经导出export的内容,意思就是批量导入name和add,当然这里不是全部导入,
// 而是只导入我们需要的东西,比如这里就只导入了user.js中的name和add,age就没有导入
import {name,add} from "./user.js" 

// 导入进来就可以使用了
abc.sum(1,2);
console.log(name);
add(1,3);