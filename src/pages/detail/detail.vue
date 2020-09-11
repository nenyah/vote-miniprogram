<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 08:48:06
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-11 09:44:21
-->
<template>
  <view class="bg-purple">
    <!-- 标题 -->
    <title></title>
    <!-- 统计票数 -->
    <stats :content="getStats" :isDetail="true">
      <view class="text-2xl text-gray-100 font-bold w-full text-center mt-4"
        >投票</view
      >
    </stats>
    <!-- 选手详情 -->
    <sub-title :content="title1"></sub-title>
    <!-- 选手图片 -->
    <view class="flex justify-center">
      <vote-item :item="item"></vote-item>
    </view>

    <!-- 风采展示 -->
    <sub-title :content="title2"></sub-title>
    <detail-video></detail-video>
    <!-- 选手简介 -->
    <sub-title :content="title3"></sub-title>
    <view class="text-gray-100 p-4">{{ item.desc }}</view>
    <!-- 帮我拉票 -->
    <view class="text-center">
      <view
        class="inline-block text-gray-100 text-xl my-2 p-2 border-r-0 border-l-0 border-t-0 border-b-2 border-solid border-orange-500"
        @click="share"
      >
        帮我拉票
      </view>
    </view>

    <!-- 返回 -->
    <view class="text-center">
      <view
        class="inline-block text-gray-100 text-xl my-2 p-2 border-r-0 border-l-0 border-t-0 border-b-2 border-solid border-orange-500"
      >
        返回
      </view>
    </view>
    <!-- 脚注 -->
    <vote-footer></vote-footer>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import title from "@/components/title/title.vue"
import stats from "@/components/stats/stats.vue"
import voteItem from "@/components/vote-item/vote-item.vue"
import voteFooter from "@/components/footer/footer.vue"
import subTitle from "@/components/sub-title/sub-title.vue"
import detailVideo from "@/components/detail-video/detail-video.vue"
import { items, Iinfo, Iitem } from "@/mock/store"
export default Vue.extend({
  data() {
    return {
      items,
      id: 0,
      item: <Iitem>{},
      title1: "选手详情",
      title2: "选手风采",
      title3: "选手简介",
    }
  },
  onLoad(query) {
    console.log(query)

    this.id = +query?.id || 1
    let [item] = this.items.filter((el) => el.id === this.id)
    this.item = <Iitem>item
    uni.setNavigationBarTitle({
      title: `我是${this.id}号，${this.item?.name}, 正在参加伊婉你最美`,
    })
  },
  components: {
    title,
    stats,
    voteItem,
    voteFooter,
    subTitle,
    detailVideo,
  },
  computed: {
    getStats(): Array<Iinfo> {
      let [item] = this.items.filter((el) => el.id === this.id)
      console.log("item: ", item)

      return [
        {
          name: "当前票数",
          value: item?.vote,
        },
        {
          name: "排名",
          value: item?.rank,
        },
        {
          name: "距上一名",
          value: item?.diffLast,
        },
      ]
    },
  },
  methods: {
    share() {},
  },
})
</script>

<style></style>
