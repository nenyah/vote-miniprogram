/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-10-12 08:42:45
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 16:33:06
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { getPoster } from '@/servise/share'
import user from './modules/user'
import { token } from '@/utils/token'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: { user },
    state: {
        showModal: false,
        canvasUrl: '',
        shareTimeline: false,
        baseurl: 'huadongio.com',
        activities: [],
        currentActId: -1,
        items: [],
        currentItemId: -1,
        openid: '',
        token: '',
        unionid: '',
        isLogin: false,
    },
    mutations: {
        SET_IS_LOGIN(state, b) {
            state.isLogin = b
        },
        toggleModal(state) {
            console.log('enter vuex:::')
            state.showModal = !state.showModal
        },
        changeUrl(state, { canvasUrl }) {
            state.canvasUrl = canvasUrl
        },
        toggleShare(state) {
            state.shareTimeline = !state.shareTimeline
        },
    },
    actions: {
        share({ commit, state }, { itemId, actId }) {
            getPoster({
                itemId: itemId,
                page: 'pages/detail/detail',
                scene: `id=${itemId}&actId=${actId}`,
            })
                .then((res) => {
                    if (res.statusCode == 200) {
                        commit('changeUrl', { canvasUrl: res.data })
                        commit('toggleModal')
                    } else {
                        console.log('res:::', res)

                        uni.showToast({
                            title: '生成海报错误',
                            icon: 'none',
                        })
                    }
                })
                .catch((err) => {
                    console.log('err:::', err)

                    uni.showToast({
                        title: '生成海报错误',
                        icon: 'none',
                    })
                })
        },
        initApp({ dispatch, commit }) {
            console.log('enter initApp')
            dispatch('user/login')
        },
    },
})
