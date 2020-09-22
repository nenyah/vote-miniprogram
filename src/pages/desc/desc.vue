<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 08:45:00
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-22 10:59:11
-->
<template>
  <view class="bg-purple pt-2 h-full min-h-full">
    <title :content="activity.name"></title>
    <vote-rule :activity="activity"></vote-rule>
    <vote-detail :activity="activity"></vote-detail>
    <vote-footer :content="activity.name"></vote-footer>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import title from "@/components/title/title.vue"
import voteRule from "@/components/vote-rule/vote-rule.vue"
import voteDetail from "@/components/vote-detail/vote-detail.vue"
import voteFooter from "@/components/footer/footer.vue"
import { Iactivity } from "@/common/interface"

export default Vue.extend({
  data() {
    return {
      activity: {} as Iactivity,
      actId: 0,
    }
  },
  onLoad() {
    const { activities, currentActId }: any = getApp().globalData

    this.actId = currentActId
    this.activity = activities.filter(
      (el: Iactivity) => el.id == currentActId
    )[0]
    // 设置标题
    uni.setNavigationBarTitle({
      title: `详情-${this.activity.name}`,
    })
    console.log(this.activity)
  },
  methods: {},
  components: {
    title,
    voteRule,
    voteDetail,
    voteFooter,
  },
})
</script>

<style></style>
