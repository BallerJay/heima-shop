<!--
 * @Author: SummerJay__
 * @Date: 2021-08-10 09:09:12
 * @LastEditTime: 2021-08-10 10:11:33
 * @LastEditors: your name
 * @Description: 订单页面
 * @FilePath: \vue-shop\src\views\Order\index.vue
-->

<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>
          <el-row>
            <el-col :span="12">
              <el-input placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </span>
      </div>
      <!-- card body -->
      <!-- 订单列表数据 -->
      <el-table :data="orderList" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column
          label="订单编号"
          prop="order_number"
          width="400"
        ></el-table-column>
        <el-table-column
          label="订单价格"
          prop="order_price"
          width="100"
        ></el-table-column>
        <el-table-column label="是否付款" prop="pay_status" width="100">
          <template v-slot="scope">
            <el-tag v-if="scope.row.pay_status === '1'" type="success"
              >已付款</el-tag
            >
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="是否发货"
          prop="is_send"
          width="100"
        ></el-table-column>
        <el-table-column label="下单时间" width="200">
          <template v-slot="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showBox"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-location"
              size="mini"
              @click="showProgressBox"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>

    <!-- 修改地址对话框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="addressDialogVisible"
      width="50%"
      @close="addressClosed"
    >
      <el-form
        :model="addressForm"
        ref="addressFormRef"
        :rules="addressFormRules"
        label-width="100px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            :options="cityData"
            v-model="addressForm.address1"
            clearable
            :props="{
              expandTrigger: 'hover',
            }"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 展示物流进度的对话框 -->
    <el-dialog
      title="物流进度"
      :visible.sync="progressDialogVisible"
      width="50%"
    >
      <span>这是一段信息</span>
    </el-dialog>
  </div>
</template>

<script>
import cityData from './citydata'
export default {
  name: 'Order',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      orderList: [],
      // 控制修改地址对话框的显示与隐藏
      addressDialogVisible: false,
      addressForm: {
        address1: [],
        address2: '',
      },
      addressFormRules: {
        address1: [
          { required: true, message: '请选择省市区/县', trigger: 'blur' },
        ],
        address2: [
          { required: true, message: '请填写详细地址', trigger: 'blur' },
        ],
      },
      // 省市区/县 的数据
      cityData: cityData,
      // 物流进程对话框的显示与隐藏
      progressDialogVisible: false,
      // 存储物流信息数据
      progressInfo: [],
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get('/orders', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败！')
      }
      // console.log(res)
      this.total = res.data.total
      this.orderList = res.data.goods
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    // 展示修改地址的对话框
    showBox() {
      this.addressDialogVisible = true
    },
    // 修改对话框的关闭事件
    addressClosed() {
      this.$refs.addressFormRef.resetFields()
    },
    async showProgressBox() {
      // 此处数据有错误
      // const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      // if (res.meta.status !== 200) {
      //   return this.$message.error('获取物流进度失败！')
      // }

      // this.progressInfo = res.data
      this.progressDialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .el-card__header {
  line-height: 30px;
}
/deep/ .el-table__header-wrapper {
  line-height: 30px;
}
/deep/ .el-dialog__header {
  line-height: 60px;
}
/deep/ .el-dialog__footer {
  line-height: 40px;
}
.el-cascader {
  width: 100%;
}
</style>
