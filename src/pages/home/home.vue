<template>
  <view class="text-gray-900">
    <view v-for="activate in activates" :key="activate.id">
      <image :src="activate.bannerImg[0]" mode="widthFix"></image>
      <view>{{ activate.name }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import { activates } from "@/mock/store"
export default Vue.extend({
  data() {
    return {
      activates,
    }
  },
})
</script>

<style></style>
