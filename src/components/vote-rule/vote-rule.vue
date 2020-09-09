<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 14:28:34
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-08 14:30:52
-->
<template>
  <view class="px-4 text-gray-200">
    <view class="flex">
      <view class="flex-1">活动开始：</view>
      <view class="flex-none text-gray-500">2020-10-15 00：00</view>
    </view>
    <view class="flex">
      <view class="flex-1">活动结束：</view>
      <view class="flex-none text-gray-500">2020-12-01 00：00</view>
    </view>
    <view class="flex">
      <view class="flex-1">活动规则：</view>
      <view class="flex-1 text-gray-500"
        >每个微信号每天可以投3票（每天可为同一选手投1票）。</view
      >
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  data() {
    return {}
  },
  onLoad() {},
  methods: {},
})
</script>

<style></style>
