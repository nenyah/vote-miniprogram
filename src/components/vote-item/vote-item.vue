<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:24:24
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-10 16:56:49
-->
<template>
  <view
    class="flex flex-col w-1-2 text-center justify-center border border-solid border-gray-600 bg-purple-100 my-2 p-2"
  >
    <view class="text-gray-500 my-1">{{ item.id }} 号</view>
    <navigator v-if="index" :url="toUrl">
      <image
        :src="item.img"
        mode="widthFix"
        style="width: 100%; background-color: #eeeeee;"
      ></image>
      <view class="text-gray-100 text-lg font-bold mt-1">{{ item.name }}</view>
      <view class="text-gray-500 my-1">{{ item.group }}</view>
    </navigator>
    <view v-else>
      <image
        :src="item.img"
        mode="widthFix"
        style="width: 100%; background-color: #eeeeee;"
      ></image>
      <view class="text-gray-100 text-lg font-bold mt-1">{{ item.name }}</view>
      <view class="text-gray-500 my-1">{{ item.group }}</view>
    </view>
    <view v-if="index">
      <view class="flex w-full">
        <view
          class="flex-1 border border-solid border-gray-500 bg-purple-300 text-white p-2"
          >{{ item.vote }}</view
        >
        <view
          class="flex-1 border border-solid border-orange-500 bg-orange-500 text-white p-2"
          >投票</view
        >
      </view>
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
    index: Boolean,
  },
  onLoad() {},
  methods: {},
  computed: {
    toUrl(): string {
      return `/pages/detail/detail?id=${this.item.id}`
    },
  },
})
</script>

<style></style>
