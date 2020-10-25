<template>
  <view class="bg-theme-p-1">
    <brand-show></brand-show>
    <view class="flex flex-col justify-center items-center pb-12">
      <title :content="activity.name"></title>
      <view class="pt-4 my-2 bg-gray-100 w-11--12 rounded">
        <vote-rule :activity="activity"></vote-rule>
      </view>
      <view class="pt-4 my-2 bg-gray-100 w-11--12 rounded">
        <vote-detail :activity="activity"></vote-detail>
      </view>
      <vote-footer :content="activity.name"></vote-footer>

    </view>
    <vote-tabbar :activeIndex="activeIndex"></vote-tabbar>
  </view>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import title from "@/components/title/title.vue"
import voteRule from "@/components/vote-rule/vote-rule.vue"
import voteDetail from "@/components/vote-detail/vote-detail.vue"
import voteFooter from "@/components/footer/footer.vue"
import brandShow from "@/components/brand-show/brand-show.vue"
import voteTabbar from "@/components/vote-tabbar/vote-tabbar.vue"

@Component({
    components: {
        title,
        voteRule,
        voteDetail,
        voteFooter,
        brandShow,
        voteTabbar,
    }
})
export default class Desc extends Vue {
    // private activity = {} as Iactivity
    private actId = -1
    private activeIndex = 1

    get activity() {
        return this.$store.state.activity.activity
    }

    onLoad() {
        // this.init()
        // 设置标题
        uni.setNavigationBarTitle({
            title: `详情${this.activity?.name ? "-" + this.activity.name : ""}`,
        })
    }

    onShow() {
        // this.init()
    }

    // init() {
    //   const {activities, currentActId}: any = getApp().globalData
    //
    //   this.actId = currentActId
    //   this.activity = activities.filter(
    //       (el: Iactivity) => el.id == currentActId
    //   )[0]
    // }
}
</script>

<style></style>
