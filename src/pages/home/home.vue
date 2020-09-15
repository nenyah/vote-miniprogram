<!--
 * @Description: 活动列表页
 * @Author: Steven
 * @Date: 2020-09-14 09:15:23
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-15 10:50:03
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
          :src="activity.bannerImg[0]"
          mode="widthFix"
          class="rounded rounded-b-none w-full"
        ></image>
        <view class="p-2 text-left">
          <view>{{ activity.name }}</view>
          <view class="flex items-center">
            <view class="fa fa-group mr-1 text-red-300 text-center"></view>
            <view>{{ activity.stats[0].value }}人参与，已投票：</view>
            <view>{{ activity.stats[1].value }}</view>
          </view>
          <view class="flex items-center">
            <view class="fa fa-clock-o mr-1 text-red-300 text-center"></view>
            <view>{{ activity.endTime }} 结束</view>
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
export default Vue.extend({
  data() {
    return {
      activities,
    }
  },

  onLoad() {
    // 1. 获取授权用户信息
    // 2. 服务器接口获取活动信息
    // 3. 用户信息，活动信息存入globaldata
    // 4. 跳转投票首页参数传入活动id
    this._getUserInfo()
    this._getActivities()
  },
  methods: {
    // FIXME 获取授权用户信息
    _getUserInfo() {
    },
    // 获取活动信息
    async _getActivities() {
      try {
        this.activities = await getActivities(0)
      } catch (error) {
        console.error(error)
        this.activities = activities
      }
    },
  },
})
</script>

<style></style>
