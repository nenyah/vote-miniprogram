<template>
  <view class="px-4 pt-2">
    <view class="w-4-5  mt-2 p-2 stat-border">
      <view class="flex stat-content">
        <view class="flex-1" v-for="(item, index) in content" :key="index">
          <view class="text-gray-100 text-center text-xl">
            {{ item.value }} {{ isDetail && index === 2 ? " 票" : "" }}
          </view>
          <view class="text-yellow-900 text-center">
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
  border-top: 1px solid #000000;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: none;
  border-image: linear-gradient(to top, #42384e, #000);
  border-image-slice: 10;

  .stat-content {
    margin: 0 auto;
    padding: 5px 15px;
    border-top: 1px solid #000000;
    border-left: 1px solid;
    border-right: 1px solid;
    border-bottom: none;
    border-image: linear-gradient(to top, #42384e, #000);
    border-image-slice: 10;
    background: #d2b3f9;
  }
}
</style>
