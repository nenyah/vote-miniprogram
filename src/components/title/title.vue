<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 14:22:37
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-09 16:47:16
-->
<template>
  <view class="text-2xl text-center text-white">{{ content }}</view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: {
    content: {
      type: String,
      default: "2020伊人如梦*婉美如你 | 伊婉明星脸 全国100强投票",
    },
  },
  data() {
    return {}
  },
  onLoad() {},
  methods: {},
})
</script>

<style></style>
