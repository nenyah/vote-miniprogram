<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:24:24
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-10 09:20:08
-->
<template>
  <view class="flex flex-col w-1-2 text-center justify-center">
    <view class="code">{{ item.id }}</view>
    <navigator url="#">
      <image :src="item.img" mode=""></image>
      <view class="name">{{ item.name }}</view>
      <view class="group">{{ item.group }}</view>
    </navigator>

    <view class="flex w-4-5">
      <view
        class="border border-solid border-gray-500 bg-gray-500 text-white p-2"
        >{{ item.vote }}</view
      >
      <view
        class="border border-solid border-orange-500 bg-orange-500 text-white p-2"
        >投票</view
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
  props: {
    item: Object,
  },
  onLoad() {},
  methods: {},
})
</script>

<style></style>
