<!--
 * @Description: 视频
 * @Author: Steven
 * @Date: 2020-09-10 15:15:21
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-10 16:26:37
-->
<template>
  <view>
    <view class="uni-padding-wrap uni-common-mt">
      <view>
        <video
          id="myVideo"
          src="#"
          controls
        ></video>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  data() {
    return {
      src: "",
    }
  },
})
</script>

<style></style>
