<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:24:24
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-11 15:43:31
-->
<template>
  <view
    class="flex flex-col flex-1 text-center justify-center border border-solid border-gray-600 bg-purple-100 m-2 p-2 border-img"
    :class="customWidth"
  >
    <view class="text-gray-500 my-1">{{ item.id }} 号</view>
    <navigator v-if="index" :url="toUrl">
      <image
        :src="item.img"
        mode="widthFix"
        style="width: 100%; background-color: #eeeeee;"
      ></image>
      <view class="text-gray-100 text-lg font-bold mt-1">{{ item.name }}</view>
      <view class="text-gray-500 my-1">{{ item.group }}</view>
    </navigator>
    <view v-else>
      <image
        :src="item.img"
        mode="widthFix"
        style="width: 100%; background-color: #eeeeee;"
      ></image>

      <view class="text-gray-100 text-lg font-bold mt-1">{{ item.name }}</view>
      <view class="text-gray-500 my-1">{{ item.group }}</view>
    </view>
    <view v-if="index">
      <view class="flex w-full">
        <view
          class="flex-1 border border-solid border-gray-500 bg-purple-300 text-white p-2"
          >{{ item.vote }}</view
        >
        <view
          class="flex-1 border border-solid border-orange-500 bg-orange-500 text-white p-2"
          @click="vote"
        >
          投票
        </view>
      </view>
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
    index: Boolean,
    col: {
      type: Number,
      default: 1,
    },
  },
  onLoad() {},
  methods: {
    vote() {
      /**
       * 1. 判断是否关注公众号
       * 2. 判断是否在投票时间
       * 3. 判断是否超出限制
       * 可以抽离逻辑 isValid()
       */
      // FIXME
      this.$emit("plusVote", this.item.vote + 1)
    },
  },
  computed: {
    toUrl(): string {
      return `/pages/detail/detail?id=${this.item.id}`
    },
    customWidth(): string {
      return `w-${64 / this.col}`
    },
  },
})
</script>

<style lang="scss" scoped>
.border-img {
  position: relative;
}

.border-img::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  background: $input-bg1-base64-code;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
}

.border-img::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  background: $input-bg2-base64-code;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
}
</style>
