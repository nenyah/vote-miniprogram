<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 14:44:22
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-15 10:28:12
-->
<template>
  <view class="text-center text-gray-500">@{{ content }}</view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: {
    content: {
      type: String,
      default: "@2020伊人如梦*婉美如你",
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
