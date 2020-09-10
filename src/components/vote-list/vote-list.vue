<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:24:10
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-10 16:57:14
-->
<template>
  <view class="text-gray-100">
    <view v-if="!isIndex">
      <view class="flex w-4-5 px-2 m-auto text-orange-500">
        <view class="flex-1">排名</view>
        <view class="flex-1">编号</view>
        <view class="flex-1">参与选手</view>
        <view class="flex-1">票数</view>
      </view>
    </view>
    <block v-for="(item, index) in items" :key="item.id">
      <view class="" v-if="isIndex">
        <vote-item :item="item" :index="true"></vote-item>
      </view>
      <view v-else>
        <rank-item :item="item" :index="index"></rank-item>
      </view>
    </block>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import voteItem from "@/components/vote-item/vote-item.vue"
import rankItem from "@/components/rank-item/rank-item.vue"

export default Vue.extend({
  data() {
    return {}
  },
  props: {
    items: Array,
    pageType: String,
  },
  onLoad() {},
  methods: {},
  components: {
    voteItem,
  },
  computed: {
    isIndex(): Boolean {
      return this.pageType === "index"
    },
  },
})
</script>

<style></style>
