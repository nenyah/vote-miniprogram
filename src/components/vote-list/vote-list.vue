<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:24:10
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-11 14:45:10
-->
<template>
  <view class="text-gray-100">
    <view v-if="!isIndex">
      <view class="flex w-4-5 px-2 m-auto text-orange-500 text-center">
        <view class="flex-1">排名</view>
        <view class="flex-1">编号</view>
        <view class="flex-1">参与选手</view>
        <view class="flex-1">票数</view>
      </view>
    </view>

    <view class="flex flex-row flex-wrap w-full justify-center" v-if="isIndex">
      <block v-for="item in items" :key="item.id">
        <vote-item
          :item="item"
          :index="true"
          :col="2"
          @plusVote="handlePlusVote"
        ></vote-item>
      </block>
    </view>
    <view v-else>
      <block v-for="(item, index) in items" :key="item.id">
        <rank-item :item="item" :index="index"></rank-item>
      </block>
    </view>
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
  methods: {
    handlePlusVote(e: number) {
      console.log("接收vote-item的数据", e)
    },
  },
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
