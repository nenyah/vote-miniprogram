import {Module} from "vuex"
import api from "@/api"
import {Iactivity} from "@/common/activity"
import {Activity} from "@/model/activity"

interface State {
    activities: Iactivity[]
    activity: Iactivity
    isValidTime: boolean
}


const init: Module<State, any> = {
    namespaced: true,
    state: {
        activities: [],
        activity: new Activity(),
        isValidTime: false
    },
    mutations: {
        setActivities: (state, data) => {
            state.activities = data
        },
        selectActivityByID: (state, id) => {
            const activity = state.activities.filter(el => el.id === id)[0]
            state.activity = new Activity(activity)
        }
    },
    getters: {},
    actions: {
        getActivities: async ({commit}) => {
            try {
                const res = await api.activity.activities()
                if (res.data) {
                    commit("setActivities", res.data)
                }
            } catch (e) {
                console.log("获取活动信息失败", e)
                uni.showToast({
                    title: `获取活动信息失败`,
                    icon: "none"
                })
            }
        },
        recordVisit: async ({commit}, actId) => {
            try {
                await api.activity.addVisits(actId)
                console.log("增加访客成功")
            } catch (e) {
                console.log("增加访客失败", e)
            }
        }
    },
}
export default init
