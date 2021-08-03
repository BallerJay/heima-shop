/*
 * @Author: SummerJay__
 * @Date: 2021-08-02 22:12:23
 * @LastEditTime: 2021-08-03 14:02:54
 * @LastEditors: your name
 * @Description:
 * @FilePath: \vue-shop\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "@/assets/css/global.css";
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1';
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
