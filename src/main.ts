/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 15:17:43
 */
import Vue from 'vue'
import App from './App.vue'
import request from './utils/request'
import store from '@/store'
import * as filters from '@/filters/filters'

Object.keys(filters).forEach((key: string) => {
    Vue.filter(key, (filters as any)[key])
})

Vue.prototype.$request = request
Vue.prototype.$store = store
Vue.config.productionTip = false
new App({
    store,
}).$mount()
