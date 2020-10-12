import Vue from "vue"
import Vuex from "vuex"
import {getPoster} from "@/servise/share"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showModal: false,
        canvasUrl: ""
    },
    mutations: {
        toggleModal(state) {
            console.log("enter vuex:::")
            state.showModal = !state.showModal
        },
        changeUrl(state, {canvasUrl}) {
            state.canvasUrl = canvasUrl
        }
    },
    actions: {
        share({commit, state}, {itemId, actId}) {
            getPoster({
                itemId: itemId,
                page: "pages/detail/detail",
                scene: `id=${itemId}&actId=${actId}`
            })
                .then(res => {
                    if (res.statusCode == 200) {
                        commit("changeUrl", {canvasUrl: res.data})
                        commit("toggleModal")
                    } else {
                        uni.showToast({
                            title: "生成海报错误",
                            icon: "none",
                        })
                    }
                }).catch(err => {
                    uni.showToast({
                        title: "生成海报错误",
                        icon: "none",
                    })
                }
            )
        }
    },
    modules: {}
})