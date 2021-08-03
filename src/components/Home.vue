<!--
 * @Author: SummerJay__
 * @Date: 2021-08-03 14:40:19
 * @LastEditTime: 2021-08-03 15:22:53
 * @LastEditors: your name
 * @Description: Home主页
 * @FilePath: \vue-shop\src\components\Home.vue
-->
<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout() {
      sessionStorage.removeItem('TOKEN_KEY')
      this.$router.push('/login')
    },
  },
}
</script>

<style lang='less' scoped>
</style>
