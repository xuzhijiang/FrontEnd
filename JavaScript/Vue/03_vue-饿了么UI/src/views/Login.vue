<template>
  <div>
    <!-- Login.vue 是视图组件，其中 el-* 的元素为 ElementUI 自定义组件 -->
    <!-- loginForm相当于是id, model绑定了vue中的form对象-->
    <!-- login-box在下面定义了 -->
    <!-- rules定义了form的规则 -->
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <!-- form.username: input这个view和Vue中的数据双向绑定-->
        <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },

                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                rules: {
                    username: [
                        // blur的意思是失去焦点的时候触发这个规则
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                },

                // 对话框显示和隐藏
                dialogVisible: false
            }
        },
        methods: {
            onSubmit(formName) {
                // 为表单绑定验证功能
                // 拿到form后做验证
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功就提交
                    if (valid) {
                        // 把登录状态存放到SessionStorage中
                        // 这里只能存放字符串,不能存放boolean
                        sessionStorage.setItem("isLogin", "true");

                        // 调用actions中的方法
                        this.$store.dispatch("asyncUpdateUser", this.form);

                        // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
                        this.$router.push("/main");
                    } else {
                        this.dialogVisible = true;
                        return false;
                    }
                });

                // 跳转到main
                // this.$router.push("/main");
            }
        }
    }
</script>

<style lang="scss" scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    /*border圆角*/
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    /*边框影音效果*/
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    /*剧中*/
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
