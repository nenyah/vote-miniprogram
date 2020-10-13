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
import store from "@/store"
import * as filters from "@/filters/filters"

Object.keys(filters).forEach((key: string) => {
    Vue.filter(key, (filters as any)[key])
})

Vue.prototype.$request = request
Vue.prototype.$store = store
Vue.config.productionTip = false
// new App().$mount()
const app = new Vue({
    store,
    ...App
})
app.$mount()