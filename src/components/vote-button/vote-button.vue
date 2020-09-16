<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  methods: {
    handleClick() {
      console.log("触发点击")
    },
  },
})
</script>

<style scoped></style>
