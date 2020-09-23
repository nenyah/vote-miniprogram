<template>
  <view class="px-2 text-2xl text-center text-white">{{ content }}</view>
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
