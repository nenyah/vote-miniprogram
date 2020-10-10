<template>
  <view>
    <view
        v-for="activity in activities"
        :key="activity.id"
        class="my-4 px-2 text-center text-gray-500 rounded-lg shadow-lg"
    >
      <navigator :data-id="activity.id" :url="`/pages/index/index?actId=${activity.id}`" open-type="navigate">
        <swiper class="w-full h-56" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
                :duration="duration" v-for="(img,index) in activity.bannerImg" :key="index">
          <swiper-item>
            <image
                :src="img"
                mode="widthFix"
                class="rounded rounded-b-none w-full h-64"
            ></image>
          </swiper-item>
        </swiper>
        <view class="p-2 text-left">
          <view class="text-gray-900">{{ activity.name }}</view>
          <view class="flex items-center">
            <view class="fa fa-group mr-1 text-red-300 text-center"></view>
            <view>{{ activity.stats[1].value }}人参与，已投票：</view>
            <view>{{ activity.stats[2].value }}</view>
          </view>
          <view class="flex items-center">
            <view class="fa fa-clock-o mr-1 text-red-300 text-center"></view>
            <view> {{ activity.endTime|formatTime }} 结束</view>
          </view>
        </view>
      </navigator>
    </view>
  </view>

</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import {login} from "@/servise/login"
import {getActivities} from "@/servise/activates"

@Component({
  filters: {
    formatTime: (value: string) => {
      return value.substr(0, 16).replace("T", " ")
    }
  }
})
export default class home extends Vue {
  private activities = {}
  private autoplay = false
  private interval = 300
  private indicatorDots = false

  async onLoad() {
// 后端登录
    await login()

    // 1. 服务器接口获取活动信息
    this.activities = await this._getActivities()
    // 2. 活动信息存入globaldata
    let globalData: any = getApp().globalData
    globalData.activities = this.activities
  }


  // 获取活动信息
  async _getActivities() {
    try {
      let {data}: any = await getActivities()
      return data.data
    } catch (error) {
      uni.showToast({
        title: "获取活动信息错误",
        icon: "none",
      })
    }
  }

};
</script>

<style scoped>

</style>