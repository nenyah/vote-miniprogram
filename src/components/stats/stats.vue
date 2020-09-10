<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:22:09
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-10 11:29:31
-->
<template>
  <view class="px-4 pt-2">
    <view
      class="w-4-5 border-2 border-gray-100 mt-2 p-2 border border-b-0 border-gray-200 border-solid"
    >
      <view class="flex">
        <view class="flex-1" v-for="(item, index) in content" :key="index">
          <view class="text-gray-100 text-center text-xl">
            {{ item.value }}
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
  data() {
    return {}
  },
  props: {
    content: Array,
  },
  onLoad() {},
  methods: {},
  components: {
    title,
  },
})
</script>

<style></style>
