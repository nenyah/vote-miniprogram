<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 15:49:57
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-08 16:28:07
-->
<template>
  <view>
    <view class="row">
      <view class="col">{{index+1}}</view>
      <view class="col">{{item.id}}</view>
      <view class="col">{{item.name}}</view>
      <view class="col">{{item.vote}}</view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  data() {
    return {}
  },
  props: {
    item: Object,
    index: Number,
  },
  onLoad() {},
  methods: {},
})
</script>

<style></style>
