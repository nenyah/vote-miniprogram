<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 14:28:34
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-14 16:46:00
-->
<template>
  <view class="mt-5 pt-8 z-20 mb-2 px-4 text-gray-200 -t-10">
    <main-title :title="title"></main-title>
    <view class="flex">
      <view class="w-18">
        <view class="fa fa-clock-o text-orange-500 mr-2"></view>
        活动开始：
      </view>
      <view class="flex-none text-gray-500 text-left">
        {{ activity.startTime }}
      </view>
    </view>
    <view class="flex">
      <view class="w-18">
        <view class="fa fa-clock-o text-orange-500 mr-2"></view>
        活动结束：
      </view>
      <view class="flex-none text-gray-500 text-left">
        {{ activity.endTime }}
      </view>
    </view>
    <view class="flex">
      <view class="w-18">
        <view class="fa fa-clock-o text-orange-500 mr-2"></view>
        活动规则：
      </view>
      <view class="flex-1 text-gray-500 text-left">
        每个微信号每天可以投{{ rule.day }}票（每天可为同一选手投{{
          rule.item
        }}票）。
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import mainTitle from "@/components/main-title/main-title.vue"
export default Vue.extend({
  props: {
    activity: Object,
  },
  components: {
    mainTitle,
  },
  data() {
    return {
      rule: { day: 3, item: 1 },
      title: "活动规则",
    }
  },
  onLoad() {},
  methods: {},
})
</script>

<style lang="scss" scoped>
.-t-10 {
  top: -20px;
}
</style>
