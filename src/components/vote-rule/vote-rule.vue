<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 14:28:34
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-11 14:05:54
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
        {{ startTime }}
      </view>
    </view>
    <view class="flex">
      <view class="w-18">
        <view class="fa fa-clock-o text-orange-500 mr-2"></view>
        活动结束：
      </view>
      <view class="flex-none text-gray-500 text-left">
        {{ endTime }}
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
  components: {
    mainTitle,
  },
  data() {
    return {
      startTime: "2020-10-15 00：00",
      endTime: "2020-12-01 00：00",
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
  top:-20px;
}
</style>
