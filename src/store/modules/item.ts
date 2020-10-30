import {Module} from "vuex"
import api from "@/api"
import {Iitem, ItemResponse} from "@/common/Item"
import Item from "@/model/item"
import throttle from "lodash/throttle"
import {handleVote} from "@/servise/vote"

interface State {
    items: Iitem[];
    item: Iitem;
    top10: Iitem[];
    hasMore: boolean;
    pageNo: number;
    showModal: boolean
    canvasUrl: string
    shareTimeline: boolean
    searching: boolean
}

const init: Module<State, any> = {
    namespaced: true,
    state: {
        items: [] as Iitem[],
        item: new Item(),
        top10: [] as Iitem[],
        hasMore: true,
        pageNo: 1,
        showModal: false,
        canvasUrl: "",
        shareTimeline: false,
        searching: false,
    },
    mutations: {
        initItems: state => {
            state.items = []
            state.pageNo = 1
            state.hasMore = true
            state.searching = false
        },
        setItems: (state, data) => {
            state.items = data
        },
        updateItems: (state, data) => {
            state.items = [...state.items, ...data]
        },
        setItem: (state, o) => {
            state.item = new Item(o)
        },
        addPageNo: state => {
            state.pageNo += 1
        },
        changeHasMore: state => {
            state.hasMore = false
        },
        setTop10: (state, data) => {
            state.top10 = data
        },
        toggleModal(state) {
            state.showModal = !state.showModal
        },
        changeUrl(state, {canvasUrl}) {
            state.canvasUrl = canvasUrl
        },
        toggleShare(state) {
            state.shareTimeline = !state.shareTimeline
        },
        toggleSearch(state) {
            state.searching = true
        }
    },
    getters: {},
    actions: {
        itemsByCate: throttle(async ({state, commit, rootState}) => {
            const activityId = rootState.activity.activity.id
            const categoryId = rootState.category.category.id
            let res = {} as ItemResponse
            if (!state.hasMore) {
                return
            }
            try {
                res = await api.item.itemsByCate({
                    pageNo: state.pageNo,
                    activityId,
                    categoryId
                })
            } catch (e) {
                console.log("获取数据错误", e)
                uni.showToast({
                    title: "获取选手数据错误" + e,
                    icon: "none"
                })
            }
            if (res?.data?.length < 10) {
                commit("changeHasMore")
                commit("updateItems", res.data)
                return
            }
            commit("updateItems", res.data)
            commit("addPageNo")
        }, 2000),
        getTop10: async ({state, commit, rootState}) => {
            const activityId = rootState.activity.activity.id
            try {
                const res = await api.item.itemsAll({activityId})
                commit("setTop10", res.data)
            } catch (e) {
                console.log("获取前10选手信息失败", e)
                uni.showToast({
                    title: `获取前10选手信息失败`,
                    icon: "none"
                })
            }
        },
        itemByCode: async ({state, commit, rootState}, code) => {
            const activityId = rootState.activity.activity.id
            try {
                const res = await api.item.itemByCode({code, activityId})
                commit("initItems")
                commit("changeHasMore")
                commit("toggleSearch")
                commit("setItems", res.data)
            } catch (e) {
                console.log("获取选手信息失败", e)
                uni.showToast({
                    title: `获取选手信息失败`,
                    icon: "none"
                })
            }
        },
        itemById: async ({state, commit, rootState}, {id, activityId}) => {
            try {
                const res = await api.item.itemById({id, activityId})
                if (res.data.length > 0) {
                    commit("setItem", res.data[0])
                }
            } catch (e) {
                console.log("获取选手信息失败", e)
                uni.showToast({
                    title: `获取选手信息失败`,
                    icon: "none"
                })
            }
        },
        async share({commit, state, rootState}, {itemId}) {
            const actId = rootState.activity.activity.id
            try {
                const res = await api.item.itemById({id: itemId, activityId: actId})
                if (res.data.length > 0) {
                    commit("setItem", res.data[0])
                }
            } catch (e) {
                console.log("获取选手信息错误", e)
            }
            api.item.getPoster({
                itemId: itemId,
                page: "pages/detail/detail",
                scene: `id=${itemId}&actId=${actId}`,
            })
                .then((res) => {
                    commit("changeUrl", {canvasUrl: res})
                    commit("toggleModal")
                })
                .catch((err) => {
                    console.log("err:::", err)
                    uni.showToast({
                        title: "生成海报错误",
                        icon: "none",
                    })
                })
        },
        async vote({commit, state, rootState}) {
            const {status} = rootState.activity.activity
            const {isFollower} = rootState.user
            const isLogin = rootState.isLogin
            if (status !== "ONGOING") {
                uni.showToast({
                    title: "现在不是投票时间哦！",
                    icon: "none",
                })
                return
            }
            if (!isFollower) {
                uni.showModal({
                    content: "请先关注公众号《YVOIRE伊婉》再投票哦！",
                    showCancel: false,
                })
                return
            }
            if (!isLogin) {
                uni.showModal({
                    content: "你还没有登录",
                    cancelText: "暂不登录",
                    confirmText: "马上登录",
                    success: async (res) => {
                        console.log("登录同意后信息", res)
                        if (res.cancel) {
                            return
                        }
                        uni.navigateTo({
                            url: `/pages/login/login`,
                        })
                    },
                })
                return
            }
            try {
                // 上传投票信息
                let {success, errorMsg} = await handleVote(state.item.id)
                console.log("上传之后", success, errorMsg)
                if (success !== true) {
                    uni.showModal({
                        content: errorMsg,
                        showCancel: false,
                    })
                    return
                }
                uni.showModal({
                    content: "投票成功！",
                    showCancel: false,
                    success: (res) => {
                        // 上传成功后刷新页面
                        uni.$emit("update", {msg: "页面更新"})
                    },
                })
            } catch (err) {
                console.error("上传投票信息失败", err)
            }

        },
    }
}
export default init
