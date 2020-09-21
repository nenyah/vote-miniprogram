<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 15:49:57
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-21 13:36:53
-->
<template>
  <view
    class="flex w-4-5 my-2 py-2 text-center"
    :class="{ 'bg-purple-light': isActive }"
  >
    <view class="flex justify-center flex-1 text-center">
      <view :class="top3">{{ index + 1 }}</view>
    </view>
    <view class="flex-1 text-center">{{ item.code }}</view>
    <navigator :url="toUrl">
      <view class="flex-1 text-center">{{ item.name }}</view>
    </navigator>
    <view class="flex-1 text-center">{{ item.stats[0].value }}</view>
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
      return `/pages/detail/detail?id=${this.item.code}`
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
