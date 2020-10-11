<template>
  <view class="py-2 z-20 mb-2 px-4 text-red-300 -t-10">
    <main-title :title="title"></main-title>
    <view class="flex">
      <view class="w-18">
        <view class="fa fa-clock-o text-red-300 mr-2"></view>
        活动开始：
      </view>
      <view class="flex-none text-gray-600 text-left">
        {{ formatTime(activity.startTime) }}
      </view>
    </view>
    <view class="flex">
      <view class="w-18">
        <view class="fa fa-clock-o text-red-300 mr-2"></view>
        活动结束：
      </view>
      <view class="flex-none text-gray-600 text-left">
        {{ formatTime(activity.endTime) }}
      </view>
    </view>
    <view class="flex">
      <view class="w-18">
        <view class="fa fa-clock-o text-red-300 mr-2"></view>
        投票规则：
      </view>
      <view class="flex-1 text-gray-600 text-left flex flex-col">
        <view v-for="(rule,index) in activity.rule"
              :key="index">{{ rule.name }}:{{ rule.value }}票
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import mainTitle from "@/components/main-title/main-title.vue"

export default Vue.extend({
  props: ["activity"],
  components: {
    mainTitle,
  },
  data() {
    return {
      title: "活动规则",
    }
  },
  computed: {
    formatTime() {
      return (params: string) => {
        return params?.substr(0, 16).replace("T", " ")
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.-t-10 {
  top: -20px;
}
</style>
