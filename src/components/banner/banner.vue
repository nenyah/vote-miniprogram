<template>
  <view>
    <image
      :src="src[0]"
      mode="aspectFill"
      style="width: 100vw; background-color: #eeeeee;"
    ></image>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: {
    src: {
      type: Array,
      default: [
        "https://www.huotoupiao.com/assets/www/ActivityPc2/img/tem2.jpg",
      ],
    },
  },
})
</script>

<style></style>
