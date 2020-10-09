<template>
  <view class="px-4">
    <video id="myVideo" :src="src" controls class="w-full h-64"></video>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: {
    src: {
      type: String,
      required: true,
    },
  },
})
</script>

<style></style>
