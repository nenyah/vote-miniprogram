<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:22:09
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-09 16:52:17
-->
<template>
  <view class="px-4 pt-2">
    <title></title>
    <view class="w-4-5 border-2 border-gray-100">
      <view class="text-yellow-900">
        <view>100</view>
        <view>1678395</view>
        <view>45597802</view>
      </view>
      <view class="text-gray-100">
        <view>参赛选手</view>
        <view>累计票数</view>
        <view>累计访问</view>
      </view>
      <view>活动结束时间还有{{ lastdate }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import title from "@/components/title/title.vue"
export default Vue.extend({
  data() {
    return {
      lastdate: "2天",
    }
  },
  onLoad() {},
  methods: {},
  components: {
    title,
  },
})
</script>

<style></style>
