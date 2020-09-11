<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:22:51
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-11 14:19:35
-->
<template>
  <view class="bg-color pt-4">
    <vote-rule></vote-rule>
    <view class="text-white flex px-4">
      <view class="attr"
        ><view class="fa fa-clock-o text-orange-500 mr-2"></view
        >活动详情：</view
      >
      <view class="flex">展开<view class="text-orange-500 ml-2">></view></view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import voteRule from "@/components/vote-rule/vote-rule.vue"
export default Vue.extend({
  data() {
    return {}
  },
  onLoad() {},
  methods: {},
  components: {
    voteRule,
  },
})
</script>

<style lang="scss" scoped>
.bg-color {
  background-image: $rule-bg-base64-code;
  background-size: 100%;
}
</style>
