<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:24:10
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-08 16:26:59
-->
<template>
  <view>
    <view v-for="(item, index) in items" :key="item.id">
      <view v-if="isIndex">
        <vote-item :item="item"></vote-item>
      </view>
      <view v-else>
        <view class="header">
          <view class="row">排名</view>
          <view class="row">编号</view>
          <view class="row">参与选手</view>
          <view class="row">票数</view>
        </view>
        <rank-item :item="item" :index="index"></rank-item>
      </view>
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
