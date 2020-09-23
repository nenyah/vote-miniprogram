<template>
	
  <view class="bg-purple pt-2 h-full min-h-full">
	  <view v-if="actId<0" class="text-gray-100 text-center">
		  还没有选择活动哦
	  </view>
	  <view v-else>
		  <title :content="activity.name"></title>
    <vote-rule :activity="activity"></vote-rule>
    <vote-detail :activity="activity"></vote-detail>
    <vote-footer :content="activity.name"></vote-footer>
	</view>
    
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
      actId: -1,
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
      title: `详情-${this.activity?.name}`,
    })
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
