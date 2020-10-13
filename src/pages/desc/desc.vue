<template>
  <view class="bg-theme-p-1">
    <brand-show></brand-show>
    <view v-if="actId < 0" class="text-gray-100 text-center">
      还没有选择活动哦
    </view>
    <view v-else class="flex flex-col justify-center items-center">
      <title :content="activity.name"></title>
      <view class="pt-4 my-2 bg-gray-100 w-11--12 rounded">
        <vote-rule :activity="activity"></vote-rule>
      </view>
      <view class="pt-4 my-2 bg-gray-100 w-11--12 rounded">
        <vote-detail :activity="activity"></vote-detail>
      </view>
      <vote-footer :content="activity.name"></vote-footer>
      <vote-tabbar :activeIndex="activeIndex"></vote-tabbar>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import title from "@/components/title/title.vue"
import voteRule from "@/components/vote-rule/vote-rule.vue"
import voteDetail from "@/components/vote-detail/vote-detail.vue"
import voteFooter from "@/components/footer/footer.vue"
import brandShow from "@/components/brand-show/brand-show.vue"
import voteTabbar from "@/components/vote-tabbar/vote-tabbar.vue"
import {Iactivity} from "@/common/activity"

export default Vue.extend({
  data() {
    return {
      activity: {} as Iactivity,
      actId: -1,
      activeIndex: 1,
    }
  },
  onLoad() {
    this.init()
    // 设置标题
    uni.setNavigationBarTitle({
      title: `详情${this.activity?.name ? "-" + this.activity.name : ""}`,
    })
  },
  onShow() {
    this.init()
  },
  methods: {
    init() {
      const {activities, currentActId}: any = getApp().globalData

      this.actId = currentActId
      this.activity = activities.filter(
          (el: Iactivity) => el.id == currentActId
      )[0]
    },
  },
  components: {
    title,
    voteRule,
    voteDetail,
    voteFooter,
    brandShow,
    voteTabbar,
  },
})
</script>

<style></style>
