/*
 * @Author: SummerJay__
 * @Date: 2021-08-02 22:14:41
 * @LastEditTime: 2021-08-03 14:18:07
 * @LastEditors: your name
 * @Description:
 * @FilePath: \vue-shop\src\plugins\element.js
 */
import Vue from "vue";
import { Button, Form, FormItem, Input, Message } from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.prototype.$message = Message;
