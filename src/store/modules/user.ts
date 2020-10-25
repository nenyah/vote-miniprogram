import {Module} from "vuex"
import {UserInfoResponse} from "@/common/interface"
import {User} from "@/model/user"
import api from "@/api"
import {token} from "@/utils/token"
import isEmpty from "lodash/isEmpty"

const SET_SYNOPSIS = "SET_SYNOPSIS"
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
    isFollower: boolean
}

const init: Module<State, any> = {
    namespaced: true,
    state: {
        info: new User(),
        hasLogin: false,
        loginProvider: "weixin",
        openid: "",
        signature: "",
        encryptedData: "",
        iv: "",
        isFollower: false
    },
    mutations: {
        [SET_SYNOPSIS](state, o) {
            state.info = new User(o)
        },
        isFollower(state) {
            state.isFollower = true
        }
    },
    getters: {},
    actions: {
        login: ({state, commit}) => {
            return new Promise((resolve, reject) => {
                uni.login({
                    provider: "weixin",
                    success: (res) => {
                        api.user.wxMaLogin(res.code).then((res) => {
                            token.set(res.token)
                            if (res.unionId !== undefined) {
                                commit("isFollower")
                            }
                            if (!isEmpty(res.userInfo)) {
                                commit("SET_IS_LOGIN", true, {root: true})
                                commit(SET_SYNOPSIS, res.userInfo)
                            }
                            resolve(res)
                        })
                    },
                })
            })
        },
        getUserInfo: ({state, commit}) => {
            return new Promise(async (resolve) => {
                const {signature, encryptedData, iv} = state
                try {
                    const res = await api.user.info({signature, encryptedData, iv})
                    commit("SET_IS_LOGIN", true, {root: true})
                    commit(SET_SYNOPSIS, res)
                    resolve(res)
                } catch (e) {
                    console.log("获取用户信息错误", e)
                }
            })
        },
    },
}
export default init
