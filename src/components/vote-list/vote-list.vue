<template>
  <view class="text-gray-100 flex flex-col items-center w-full">
    <view v-if="!isVoteItem" class="flex w-4-5 px-2 m-auto text-orange-500 text-center w-full">
      <view class="flex-1">排名</view>
      <view class="flex-1">编号</view>
      <view class="flex-1">参与选手</view>
      <view class="flex-1">票数</view>
    </view>

    <scroll-view
        class="flex flex-row flex-wrap w-11--12 justify-around box-border px-2 mt-2 bg-gray-100  rounded"
        style="height:900rpx;"
        v-if="isVoteItem"
        scroll-y="true"
        @scrolltolower="lower"
        enable-flex
    >
      <block v-for="item in items" :key="item.id">
        <vote-item
            :item="item"
            :index="true"
            :col="2"
            @plusVote="handlePlusVote"
        ></vote-item>
      </block>
    </scroll-view>
    <scroll-view
        v-else
        scroll-y="true"
        @scrolltolower="lower"
        style="height:900rpx;"
    >
      <block v-for="(item, index) in items" :key="item.id">
        <rank-item :item="item" :index="index"></rank-item>
      </block>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import voteItem from "@/components/vote-item/vote-item.vue"
import rankItem from "@/components/rank-item/rank-item.vue"

export default Vue.extend({
  props: {
    items: Array,
    itemType: String,
  },
  methods: {
    lower() {
      this.$emit("tolower")
    },
  },
  components: {
    voteItem,
    rankItem,
  },
  computed: {
    isVoteItem(): Boolean {
      return this.itemType === "vote"
    },
  },
})
</script>

