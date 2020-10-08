<template>
<view class="text-lg flex py-auto items-center">
  <view class="mr-1 text-red-300">{{ title }}</view>
  <image class="w-4 h-4" src="/static/rule-icon.png"/>
</view>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: String,
  }
})
</script>

<style>

</style>