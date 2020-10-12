<template>
  <view class="px-4 pt-2 w-11--12">
    <view class="mt-2 p-2 stat-border flex flex-col items-center w-full">
      <view class="flex stat-content" style="width: 600rpx;">
        <view class="flex-1 text-center" v-for="(item, index) in content" :key="index">
          <view class="text-gray-100  text-xl">
            {{ item.value }} {{ isDetail && index === 2 ? " 票" : "" }}
          </view>
          <view class="text-theme-1">
            {{ item.name }}
          </view>
        </view>
      </view>
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import title from "@/components/title/title.vue"

export default Vue.extend({
  props: {
    content: Array,
    isDetail: Boolean,
  },
  components: {
    title,
  },
})
</script>

<style lang="scss" scoped>
.stat-border {
  padding: 3px;
  border-radius: 0;
  border-top: 1px solid #fff;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: none;
  border-image: linear-gradient(to top, #a6e6eb, #74c8d2);
  border-image-slice: 10;

  .stat-content {
    margin: 0 auto;
    padding: 5px 15px;
    border-top: 1px solid #fff;
    border-left: 1px solid;
    border-right: 1px solid;
    border-bottom: none;
    border-image: linear-gradient(to top, #a6e6eb, #74c8d2);
    border-image-slice: 10;
    background: #9bd7dc;
  }
}
</style>
