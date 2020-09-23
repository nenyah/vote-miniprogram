<template>
  <view
    class="text-gray-100 flex w-full text-center justify-center content-center my-2 py-1"
  >
    <view class="fa fa-chevron-right"></view>
    <view class="fa fa-chevron-right"></view>
    <view class="fa fa-chevron-right"></view>
    <view class="mx-2">{{ content }}</view>
    <view class="fa fa-chevron-left"></view>
    <view class="fa fa-chevron-left"></view>
    <view class="fa fa-chevron-left"></view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: {
    content: String,
  },
})
</script>

<style></style>
