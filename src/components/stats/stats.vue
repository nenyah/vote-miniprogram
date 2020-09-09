<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:22:09
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-09 16:45:26
-->
<template>
  <view>
    <title></title>
    <view>
      <view>
        <view>100</view>
        <view>1678395</view>
        <view>45597802</view>
      </view>
      <view>
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
