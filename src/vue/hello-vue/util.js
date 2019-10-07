// js在浏览器中是全局使用,为了防止变量之间混淆和干扰,我们需要使用闭包特性.

// 这个函数对象,有闭包特性.
var Utils = function() {
    // 私有属性,在外面不会被调用到
    var username;

    // 私有方法,在外面不会被调用到
    var setUsername = function(username) {
        this.username = username;
    }

    // 私有方法
    var getUsername = function() {
        return this.username;
    }

    // return出来的是公有的.
    return {
        // 公有方法
        setUsername: function(username) {
            setUsername(username);
        },
        getUsername: function() {
            return getUsername();
        }
    }
}();