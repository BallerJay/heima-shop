<!--
 * @Author: SummerJay__
 * @Date: 2021-08-04 13:51:32
 * @LastEditTime: 2021-08-07 10:00:46
 * @LastEditors: your name
 * @Description: 角色列表
 * @FilePath: \vue-shop\src\views\Roles\index.vue
-->
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮去 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRoleDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="roleList" border="">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1, index) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!--  通过for循环，嵌套渲染二级权限 -->
                <el-row
                  v-for="(item2, index) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3, index) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditRightDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delRoleById(scope.row.id)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="40%"
      @close="setRightDialogClosed"
    >
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户信息的对话框 -->
    <el-dialog
      title="修改角色信息"
      :visible.sync="editRightDialogVisible"
      width="40%"
      @close="editRightDialogClosed"
    >
      <el-form
        ref="editRightFormRef"
        :model="editRightForm"
        :rules="editRightFormRules"
        label-width="80px"
        ><el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRightForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRightForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRightInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加角色信息的对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleDialogVisible"
      width="40%"
      @close="addRoleDialogClosed"
    >
      <el-form
        ref="addRoleFormRef"
        :model="addRoleForm"
        :rules="editRightFormRules"
        label-width="80px"
        ><el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  data() {
    return {
      // 所有角色列表数据
      roleList: [],
      // 控制分配权限对话的显示与隐藏
      setRightDialogVisible: false,
      // 所有权限列表的数据
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        children: 'children',
        label: 'authName',
      },
      // 默认选中节点的 id 值
      defKeys: [],
      // 当前即将分配权限的角色id
      roleId: '',

      // 控制编辑角色对话框的显示与隐藏
      editRightDialogVisible: false,
      // 用于保存查询到的角色信息对象
      editRightForm: {},
      // 修改表单的验证规则对象
      editRightFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
        ],
      },

      // 控制添加角色对话框的显示与隐藏
      addRoleDialogVisible: false,
      // 添加角色的表单数据
      addRoleForm: {
        roleName: '',
        roleDesc: '',
      },
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取所有角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get('/roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.roleList = res.data
    },
    // 根据id删除对应的权限
    async removeRightById(role, rightId) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('用户取消了删除')
      }
      const { data: res } = await this.$http.delete(
        `/roles/${role.id}/rights/${rightId}`
      )
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败！')
      }
      this.$message.success('删除成功')
      // this.getRoleList()
      // 此方式是默认打开当前删除的展开行，无需用户再次手动点击打开
      role.children = res.data
    },
    // 展示分配权限对话框
    async showSetRightDialog(role) {
      this.roleId = role.id
      const { data: res } = await this.$http.get('/rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      }
      this.rightsList = res.data
      this.$message.success('获取权限列表成功')
      // 递归获取三级节点的id
      this.getLeafKeys(role, this.defKeys)
      this.setRightDialogVisible = true
    },
    // 通过递归的形式 获取角色下所有的三级权限 id 并保存到 defKeys 数组中
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }

      node.children.forEach((item) => this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      this.defKeys = []
    },
    // 点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(
        `/roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功')
      this.getRoleList()
      this.setRightDialogVisible = false
    },
    // 展示编辑对话框
    async showEditRightDialog(id) {
      const { data: res } = await this.$http.get(`/roles/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('查询角色信息失败')
      }
      this.editRightForm = res.data
      this.editRightDialogVisible = true
    },
    // 监听修改角色对话框的关闭事件
    editRightDialogClosed() {
      this.$refs.editRightFormRef.resetFields()
    },
    // 修改用户信息并提交
    editRightInfo() {
      this.$refs.editRightFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          `/roles/${this.editRightForm.roleId}`,
          {
            roleName: this.editRightForm.roleName,
            roleDesc: this.editRightForm.roleDesc,
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('修改角色信息失败')
        }
        this.editRightDialogVisible = false
        this.getRoleList()
        this.$message.success('修改角色信息成功')
      })
    },
    // 根据 id 删除角色
    async delRoleById(id) {
      // console.log(id)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该角色, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('用户已经取消删除！')
      }
      const { data: res } = await this.$http.delete(`/roles/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除角色失败')
      }
      this.getRoleList()
      this.$message.success('删除角色成功！')
    },
    // 监听添加角色对话框的关闭事件
    addRoleDialogClosed() {
      this.$refs.addRoleFormRef.resetFields()
    },
    // 点击按钮添加新角色
    async addRole() {
      this.$refs.addRoleFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('/roles', this.addRoleForm)
        if (res.meta.status !== 201) {
          return this.$message.error('添加角色失败！')
        }
        this.$message.success('添加角色成功！')
        this.addRoleDialogVisible = false
        this.getRoleList()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.el-row {
  margin-top: -60px;
  text-align: left;
  height: 10px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}

/deep/ .el-table__header-wrapper {
  line-height: 0px;
}
</style>
