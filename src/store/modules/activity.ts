/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-10-22 13:52:56
 * @LastEditors: Steven
 * @LastEditTime: 2020-11-26 13:03:59
 */
import { Module } from 'vuex'
import api from '@/api'
import { Iactivity } from '@/common/activity'
import { Activity } from '@/model/activity'

interface State {
    activities: Iactivity[]
    activity: Iactivity
    isValidTime: boolean
    currentActIdx: number
}

const init: Module<State, any> = {
    namespaced: true,
    state: {
        activities: [],
        activity: new Activity(),
        isValidTime: false,
        currentActIdx: 0,
    },
    mutations: {
        setActivities: (state, data) => {
            state.activities = data
        },
        selectActivityByID: async (state, id) => {
            const activity = state.activities.find((el) => el.id == id)
            state.activity = new Activity(activity)
        },
        setCurrentActIdx: (state, idx) => {
            state.currentActIdx = idx
        },
    },
    getters: {
        getActivityByIdx: (state) => {
            return state.activities.find((el) => el.id == state.currentActIdx)
        },
    },
    actions: {
        getActivities: async ({ commit }) => {
            console.log('excute getActivities:::')

            try {
                const res = await api.activity.activities()
                if (res.data) {
                    commit('setActivities', res.data)
                }
            } catch (e) {
                console.log('获取活动信息失败', e)
                uni.showToast({
                    title: `获取活动信息失败`,
                    icon: 'none',
                })
            }
        },
        recordVisit: async ({ commit }, actId) => {
            try {
                await api.activity.addVisits(actId)
                console.log('增加访客成功')
            } catch (e) {
                console.log('增加访客失败', e)
            }
        },
    },
}
export default init
