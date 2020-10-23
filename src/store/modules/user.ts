import { Module } from 'vuex'
import { getUserInfo } from './../../utils/utils'
import { UserInfoResponse } from '@/common/interface'
import { User } from '@/model/user'
import api from '@/api'
import { token } from '@/utils/token'
import * as _ from 'lodash'
const SET_SYNOPSIS = 'SET_SYNOPSIS'
type Signature = string
type EncryptedData = string
type IV = string
interface State {
    hasLogin: boolean
    loginProvider: string
    openid: string
    info: UserInfoResponse
    signature: Signature
    encryptedData: EncryptedData
    iv: IV
}
const init: Module<State, any> = {
    namespaced: true,
    state: {
        info: new User(),
        hasLogin: false,
        loginProvider: 'weixin',
        openid: '',
        signature: '',
        encryptedData: '',
        iv: '',
    },
    mutations: {
        [SET_SYNOPSIS](state, o) {
            state.info = new User(o)
        },
    },
    getters: {},
    actions: {
        login: ({ state, commit }) => {
            return new Promise((resolve, reject) => {
                uni.login({
                    provider: 'weixin',
                    success: (res) => {
                        api.user.wxMaLogin(res.code).then((res) => {
                            console.log('获取登录信息:::', res)
                            token.set(res.token)
                            if (!_.isEmpty(res.userInfo)) {
                                commit('SET_IS_LOGIN', true, { root: true })
                                commit(SET_SYNOPSIS, res.userInfo)
                            }
                        })
                    },
                })
            })
        },
        getUserInfo: ({ state, commit }) => {
            return new Promise((resolve) => {
                const { signature, encryptedData, iv } = state
                api.user.info({ signature, encryptedData, iv }).then((res) => {
                    commit('SET_IS_LOGIN', true, { root: true })
                    commit(SET_SYNOPSIS, res)
                })
            })
        },
    },
}
export default init
