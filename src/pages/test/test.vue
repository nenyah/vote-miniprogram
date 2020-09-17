<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 14:14:47
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-17 14:15:23
-->
<template>
  <view>
    <share-poster></share-poster>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import sharePoster from "@/components/share-poster/share-poster.vue"
export default Vue.extend({
  components: {
    sharePoster,
  },
})
</script>

<style lang="scss" scoped></style>
