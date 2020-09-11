<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 15:49:57
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-11 10:20:55
-->
<template>
  <view class="text-center">
    <view class="flex my-2 py-2" :class="{ 'bg-purple-light': isActive }">
      <view class="text-center">
        <view :class="top3">{{ index + 1 }}</view>
      </view>
      <view class="text-center">{{ item.id }}</view>
      <navigator :url="toUrl">
        <view class="text-center">{{ item.name }}</view>
      </navigator>
      <view class="text-center">{{ item.vote }}</view>
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
  computed: {
    top3(): String {
      let cls: string = "rounded-full h-6 w-6 flex items-center justify-center"
      if (this.index === 0) {
        cls = `${cls} bg-gold`
      } else if (this.index === 1) {
        cls = `${cls} bg-silver`
      } else if (this.index === 2) {
        cls = `${cls} bg-brone`
      }
      return cls
    },
    isActive(): boolean {
      return this.index % 2 === 0
    },
    toUrl(): string {
      return `/pages/detail/detail?id=${this.item.id}`
    },
  },
})
</script>

<style lang="scss" scoped>
.bg-gold {
  background: #f5d850;
}
.bg-silver {
  background: #e2e5ea;
}
.bg-brone {
  background: #fea569;
}
.bg-purple-light {
  background: #181c66;
}
</style>
