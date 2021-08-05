<!--
 * @Author: SummerJay__
 * @Date: 2021-08-03 14:40:19
 * @LastEditTime: 2021-08-04 14:32:00
 * @LastEditors: your name
 * @Description: Home主页
 * @FilePath: \vue-shop\src\components\Home.vue
-->
<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button></el-header
    >
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          <i class="el-icon-burger"></i>
        </div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="this.$route.path"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="menu.id + ''"
            v-for="menu in menuList"
            :key="menu.id"
          >
            <!-- 一级菜单的模块区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[menu.id]"></i>
              <!-- 文本 -->
              <span>{{ menu.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subMenu.path"
              v-for="subMenu in menu.children"
              :key="subMenu.id"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subMenu.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconsObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-box',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-tools',
      },
      // 是否折叠
      isCollapse: false,
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      sessionStorage.removeItem('TOKEN_KEY')
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('/menus')
      if (res.meta.status === 200) {
        this.menuList = res.data
      } else {
        return this.$message.error(res.meta.msg)
      }
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>

<style lang='less' scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #373d41;
  color: #333;
  text-align: center;
  line-height: 200px;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
}
</style>
