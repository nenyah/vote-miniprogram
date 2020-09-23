<!--
 * @Description: 活动列表页
 * @Author: Steven
 * @Date: 2020-09-14 09:15:23
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-22 15:55:27
-->
<template>
  <view class="text-gray-900 p-2">
    <view
        v-for="activity in activities"
        :key="activity.id"
        class="my-2 text-center text-gray-500 rounded shadow"
    >
      <navigator
          :url="'/pages/index/index?id=' + activity.id"
          open-type="reLaunch"
      >
        <image
            :src="formatUrl(activity)"
            mode="aspectFill"
            class="rounded rounded-b-none w-full h-24"
        ></image>
        <view class="p-2 text-left">
          <view class="text-gray-900">{{ activity.name }}</view>
          <view class="flex items-center">
            <view class="fa fa-group mr-1 text-red-300 text-center"></view>
            <view>{{ activity.stats[1].value }}人参与，已投票：</view>
            <view>{{ activity.stats[2].value }}</view>
          </view>
          <view class="flex items-center">
            <view class="fa fa-clock-o mr-1 text-red-300 text-center"></view>
            <view>
              {{ formatTime(activity.endTime) }} 结束
            </view>
          </view>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import {activities} from "@/mock/store"
import {getActivities} from "@/servise/activates"
import {Iactivity} from "@/common/interface"
import {userInfo} from "@/servise/login"

let app = getApp()
export default Vue.extend({
  data() {
    return {
      activities,
      userInfo: {},
    }
  },

  async onLoad() {
    // 判断是否登录
    await this._isLogin()
    // 1. 服务器接口获取活动信息
    this.activities = await this._getActivities()
    // 2. 活动信息存入globaldata
    let globalData: any = getApp().globalData
    globalData.activities = this.activities

  },
  methods: {
    // 获取活动信息
    async _getActivities() {
      try {
        let {data}: any = await getActivities(1)
        return data.data
      } catch (error) {
        return activities
      }
    },
    async _isLogin() {
      // 判断是否登录
      // 1. 检查是否有缓存,有登录进入对应页面
      // 2. 没有就进入登录授权页面
      uni.getStorage({
        key: "userInfo",
        success: async (res) => {
          console.log("缓存数据用户信息", res)
        },
        fail: (err) => {
          console.error("微信登录错误信息", err)
          uni.redirectTo({
            url: "../login/login",
          })
        },
      })
    },
  },
  computed: {
    formatUrl() {
      return (params: Iactivity) => {
        return params.bannerImg[0]
      }
    },
    formatTime() {
      return (params: string) => {
        return params.substr(0, 16).replace("T", " ")
      }
    }
  },
})
</script>

<style></style>
