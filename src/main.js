/*
 * @Author: SummerJay__
 * @Date: 2021-08-02 22:12:23
 * @LastEditTime: 2021-08-09 21:55:11
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
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

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

// 将富文本编辑器 注册为全局可用的组件
Vue.use(VueQuillEditor /* { default global options } */)

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const years = dt.getFullYear()
  const months = (dt.getMonth() + 1 + '').padStart(2, '0')
  const days = (dt.getDate() + '').padStart(2, '0')
  const hours = (dt.getHours() + '').padStart(2, '0')
  const minutes = (dt.getMinutes() + '').padStart(2, '0')
  const seconds = (dt.getSeconds() + '').padStart(2, '0')
  return `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
