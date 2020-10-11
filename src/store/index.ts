import Vue from "vue"
import Vuex from "vuex"
import {getPoster} from "@/servise/share"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showModal: false
    },
    mutations: {
        toggleModal(state) {
            console.log("enter vuex:::")
            state.showModal = !state.showModal
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