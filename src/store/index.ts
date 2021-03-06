/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-10-12 08:42:45
 * @LastEditors: Steven
 * @LastEditTime: 2020-11-26 13:02:28
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import activity from './modules/activity'
import category from './modules/category'
import item from './modules/item'
import { token } from '@/utils/token'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { user, activity, category, item },
    state: {
        openid: '',
        token: '',
        unionid: '',
        isLogin: false,
    },
    mutations: {
        SET_IS_LOGIN(state, b) {
            state.isLogin = b
        },
    },
    actions: {
        async initApp({ dispatch, commit }) {
            try {
                await dispatch('user/login')
                token.get() && (await dispatch('activity/getActivities'))
                uni.$emit('updateDetail')
            } catch (e) {
                console.log('登录失败', e)
            }
        },
    },
})
