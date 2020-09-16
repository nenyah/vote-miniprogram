<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-15 13:25:05
-->
<template>
  <view class="bg-purple">
    <!-- 广告轮播图 -->
    <banner :src="activity.bannerImg"></banner>
    <!-- 主题名称 -->
    <title :content="activity.name"></title>
    <!-- 统计区域 -->
    <stats :content="activity.stats">
      <block v-if="!activity.status==='ENDED'">
        <view class="mt-2 p-2 text-gray-100 text-center diff-time-box flex justify-center">
          {{ msg }}
          <uni-countdown color="#fff" background-color="" splitorColor="#fff" :day="day" :hour="hour" :minute="min"
                         :second="sec"></uni-countdown>
        </view>
      </block>
      <block v-else>{{ msg }}</block>
    </stats>
    <!-- 规则区域 -->
    <view class="bg-color pt-4">
      <!-- 活动规则 -->
      <vote-rule :activity="activity"></vote-rule>
      <!-- 活动详情 -->
      <view class="text-white flex px-4">
        <view class="attr">
          <view class="fa fa-clock-o text-orange-500 mr-2"></view>
          活动详情：
        </view>
        <view class="flex" @click="display = !display">
          {{ display ? "收起" : "展开" }}
          <view class="text-orange-500 ml-2">></view>
        </view>
      </view>
      <!-- 详情描述 -->
      <view v-if="display" class="my-3 text-gray-100 px-4">
        {{ activity.desc }}
      </view>
    </view>
    <!-- 搜索区域 -->
    <search-bar></search-bar>
    <!-- 项目列表区域 -->
    <vote-list :items="items" :itemType="itemType"></vote-list>
    <!-- 脚注区域 -->
    <vote-footer :content="activity.slogan"></vote-footer>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import banner from "@/components/banner/banner.vue"
import title from "@/components/title/title.vue"
import stats from "@/components/stats/stats.vue"
import voteRule from "@/components/vote-rule/vote-rule.vue"
import searchBar from "@/components/search-bar/search-bar.vue"
import voteList from "@/components/vote-list/vote-list.vue"
import voteFooter from "@/components/footer/footer.vue"
import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
import {getActivity} from "@/servise/activates"
import {getItems} from "@/servise/items"
import {activities, items} from "@/mock/store"
import moment from "moment"

moment().locale("zh-cn")
export default Vue.extend({
  data() {
    return {
      items,
      activity: {},
      day: 0,
      hour: 0,
      min: 1,
      sec: 30,
      itemType: "vote",
      display: false,
      msg: "活动已经结束",
    }
  },
  async onLoad(query) {
    /**
     * 1. 下载活动信息 通过活动列表页传入的id筛选
     * 2. 下载选手信息
     * TODO: 处理倒记时
     */
    // 1. 下载活动信息
    await this._getActivity(query)
    // 2. 下载选手信息
    await this._getItems()
    // 3. 存入当前活动id
    let globalData: any = getApp().globalData
    globalData.currentActId = +query?.id
    // 4. 计算时间
    // 获取活动时间
    let {startTime, endTime, status}: any = this.activity
    //  获取当前时间

    let now = moment()
    startTime = moment(startTime)
    endTime = moment(endTime)
    // 根据状态显示不同内容
    if (status === "ISCOMING") {
      this.msg = "活动开始还有"
    } else if (status === "ONGOING") {
      this.msg = "活动结束还有"
    }
    console.log(`now:${now}, startTime:${startTime}, endTime:${endTime}`)

  },
  methods: {
    // FIXME 获取活动信息
    async _getActivity(query: any) {
      console.log("query", query)
      try {
        this.activity = await getActivity(query.id)
      } catch (error) {
        this.activity = activities[query.id]
      }
    },
    async _getItems() {
      console.log("下载项目")
      try {
        this.items = await getItems(0)
      } catch (error) {
        this.items = items
      }
    },
  },
  components: {
    banner,
    title,
    stats,
    voteRule,
    searchBar,
    voteList,
    voteFooter,
    uniCountdown,
  },
})
</script>

<style lang="scss" scoped>
.diff-time-box {
  margin: 2px;
  padding: 4px 0;
  background: url("/static/diff-time.png") no-repeat;
  background-size: 100% 100%;
  border: none;
  border-radius: 0;
}

.bg-color {
  background-image: $rule-bg-base64-code;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
