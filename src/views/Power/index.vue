<!--
 * @Author: SummerJay__
 * @Date: 2021-08-05 13:36:32
 * @LastEditTime: 2021-08-05 14:16:49
 * @LastEditors: your name
 * @Description: 权限组件
 * @FilePath: \vue-shop\src\views\Power\index.vue
-->

<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsList" class="el-card__body" border stripe="">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级权限</el-tag>
            <el-tag type="success" v-if="scope.row.level === '1'"
              >二级权限</el-tag
            >
            <el-tag type="warning" v-if="scope.row.level === '2'"
              >三级权限</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Power',
  data() {
    return {
      // 所有的权限列表
      rightsList: [],
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    // 获取权限列表
    async getRightsList() {
      const { data: res } = await this.$http.get('/rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      }
      this.rightsList = res.data
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .el-table__header-wrapper {
  line-height: 0px;
  font-size: 18px;
}
</style>
