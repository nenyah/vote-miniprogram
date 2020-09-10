/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-09 09:51:32
 */
import Vue from "vue"
import App from "./App.vue"
import request from "./utils/request"
Vue.config.productionTip = false
Vue.prototype.request = request
new App().$mount()
