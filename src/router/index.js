/*
 * @Author: SummerJay__
 * @Date: 2021-08-02 22:12:23
 * @LastEditTime: 2021-08-03 15:03:55
 * @LastEditors: your name
 * @Description:
 * @FilePath: \vue-shop\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login.vue";
import Home from '@/components/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: '/home',
    component: Home,
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const token = sessionStorage.getItem('TOKEN_KEY')
  if (!token) return next('/login')
  next()
})

export default router;
