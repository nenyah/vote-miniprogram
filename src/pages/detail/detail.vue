<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 08:48:06
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-14 10:36:58
-->
<template>
  <view class="bg-purple">
    <!-- 标题 -->
    <title></title>
    <!-- 统计票数 -->
    <stats :content="getStats" :isDetail="true">
      <button
          class="text-2xl text-gray-100 font-bold w-full text-center mt-4"
          open-type="getUserInfo"
          @getuserinfo="getuserinfo"
          withCredentials="true"
          hover-class="none"
      >
        投票
      </button>
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
    <navigator
        :url="'/pages/index/index?id='+actId"
        open-type="reLaunch"
        hover-class="other-navigator-hover"
    >
      <view class="text-center">
        <view
            class="inline-block text-gray-100 text-xl my-2 p-2 border-r-0 border-l-0 border-t-0 border-b-2 border-solid border-orange-500"
        >
          返回
        </view>
      </view>
    </navigator>
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
import {items} from "@/mock/store"
import {Iinfo, Iitem} from "@/common/interface"

export default Vue.extend({
  data() {
    return {
      items,
      id: 0,
      actId: 0,
      item: <Iitem>{},
      title1: "选手详情",
      title2: "选手风采",
      title3: "选手简介",
    }
  },
  onLoad(query) {
    console.log(query)
    // 保存活动id
    const {currentActId}: any = getApp().globalData
    this.actId = currentActId
    // 筛选item
    this.id = +query?.id || 1
    let [item] = this.items.filter((el) => el.id === this.id)
    this.item = <Iitem>item
    // 设置标题
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

      return item.stats
    },
  },
  methods: {
    // TODO：生成分享海报
    share() {
      console.log("帮我拉票")
    },
    // TODO：处理投票
    handleVote() {
      console.log("投票")
    },
    getuserinfo: () => {
      uni.login({
        provider: "weixin",
        success: loginRes => {
          console.log(loginRes)
          // 获取用户信息
          uni.getUserInfo({
            provider: "weixin",
            success: infoRes => {
              console.log("用户信息为：",infoRes)
            }
          })
        }
      })
    },
  }
})
</script>

<style></style>
