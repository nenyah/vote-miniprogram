<!--
 * @Description: 活动列表页
 * @Author: Steven
 * @Date: 2020-09-14 09:15:23
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-18 16:55:26
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
            <view>{{ activity.stats[0].value }}人参与，已投票：</view>
            <view>{{ activity.stats[1].value }}</view>
          </view>
          <view class="flex items-center">
            <view class="fa fa-clock-o mr-1 text-red-300 text-center"></view>
            <view>
              {{ activity.endTime.substr(0, 16).replace("T", " ") }} 结束
            </view>
          </view>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import { activities } from "@/mock/store"
import { getActivities } from "@/servise/activates"
import { Iactivity } from "@/common/interface"

export default Vue.extend({
  data() {
    return {
      activities,
      userInfo: {},
    }
  },

  async onLoad() {
    // 1. 服务器接口获取活动信息
    // 2. 活动信息存入globaldata
    // 3. 跳转投票首页参数传入活动id
    console.log("home load")

    this.activities = await this._getActivities()
    let globalData: any = getApp().globalData
    globalData.activities = this.activities
  },
  methods: {
    // 获取活动信息
    async _getActivities() {
      try {
        let { data }: any = await getActivities(1)
        console.log("成功获取活动信息", data)
        return data.data
      } catch (error) {
        console.error("远程获取活动信息失败", error)
        return activities
      }
    },
  },
  computed: {
    formatUrl(): (params: Iactivity) => string {
      return (params: Iactivity) => {
        return params.bannerImg[0]
      }
    },
  },
})
</script>

<style></style>
