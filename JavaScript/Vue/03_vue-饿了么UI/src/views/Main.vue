<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <!-- 配置默认展开哪几个导航,里面是index的数组-->
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-caret-right"></i>用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/user/profile">个人信息</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/user/list/2">用户列表</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
<!--说明：此时我们将 to 改为了 :to，是为了将这一属性当成对象使用，注意 router-link 中的 name 属性名称 一定要和
路由中的 name 属性名称 匹配，因为这样 Vue 才能找到对应的路由路径；                -->
                <router-link :to="{name: 'UserAdd', params: {id: 10}}">新增用户</router-link>
<!--                <router-link to="/user/add/100">新增用户</router-link>-->
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-caret-right"></i>内容管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">分类管理</el-menu-item>
              <el-menu-item index="2-2">内容列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
              <el-dropdown-item><router-link to="/home">首页</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="/logout">退出登录</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ this.$store.getters.getUser.username }}</span>
        </el-header>

        <el-main>
          <!-- 在 <el-main> 元素中配置了 <router-view /> 用于展示嵌套路由 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped lang="scss">
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
