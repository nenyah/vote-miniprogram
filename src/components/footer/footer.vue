<template>
  <view class="text-center text-gray-500 mb-3">@{{ content }}</view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: {
    content: {
      type: String,
      default: "2020伊人如梦*婉美如你",
    },
  },
  data() {
    return {}
  },
  onLoad() {},
  methods: {},
})
</script>

<style lang="scss" scoped>
</style>