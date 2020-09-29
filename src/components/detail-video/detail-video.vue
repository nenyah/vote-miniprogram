<template>
  <view>
    <view class="uni-padding-wrap uni-common-mt">
      <view>
        <video id="myVideo" :src="src" controls></video>
      </view>
    </view>
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
