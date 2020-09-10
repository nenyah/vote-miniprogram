<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 15:49:57
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-10 09:29:01
-->
<template>
  <view>
    <view class="flex my-2 py-2" :class="{ 'bg-purple-light': isActive }">
      <view class="flex-1">
        <view :class="top3">{{ index + 1 }}</view>
      </view>
      <view class="flex-1">{{ item.id }}</view>
      <view class="flex-1">{{ item.name }}</view>
      <view class="flex-1">{{ item.vote }}</view>
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
