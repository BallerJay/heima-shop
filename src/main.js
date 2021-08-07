/*
 * @Author: SummerJay__
 * @Date: 2021-08-02 22:12:23
 * @LastEditTime: 2021-08-06 15:26:33
 * @LastEditors: your name
 * @Description:
 * @FilePath: \vue-shop\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '@/assets/css/global.css'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import TreeTable from 'vue-table-with-tree-grid'

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = sessionStorage.getItem('TOKEN_KEY')
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
