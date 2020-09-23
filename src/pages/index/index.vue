<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-23 09:23:04
-->
<template>
  <view class="bg-purple">
    <!-- 广告轮播图 -->
    <banner :src="activity.bannerImg"></banner>
    <!-- 主题名称 -->
    <title :content="activity.name"></title>
    <!-- 统计区域 -->
    <stats :content="activity.stats">
      <view
          class="mt-2 p-2 text-gray-100 text-center diff-time-box flex justify-center"
      >
        <block v-if="!(activity.status === 'ENDED')">
          {{ msg }}
          <uni-countdown
              color="#fff"
              background-color=""
              splitorColor="#fff"
              :day="day"
              :hour="hour"
              :minute="min"
              :second="sec"
              :showDay="showDay"
          ></uni-countdown>
        </block>
        <block v-else>{{ msg }}</block>
      </view>
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
        {{ activity.description }}
      </view>
    </view>
    <!-- 搜索区域 -->
    <search-bar @updateItem="handleInput"></search-bar>
    <!-- 项目列表区域 -->
    <vote-list :items="items" :itemType="itemType"></vote-list>
    <!-- 脚注区域 -->
    <vote-footer :content="activity.name"></vote-footer>
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
import {getItems} from "@/servise/items"
import {getActivities, putVisits} from "@/servise/activates"
import {activities, items} from "@/mock/store"
import moment from "moment"
import {Iactivity} from "@/common/interface"
import * as _ from "lodash"

moment().locale("zh-cn")

interface Query {
  id: number
}

export default Vue.extend({
  data() {
    return {
      items,
      actId: 0,
      activity: {} as Iactivity,
      code: "",
      dbouncedGetItems: () => {
      },
      day: 0,
      hour: 0,
      min: 1,
      sec: 30,
      itemType: "vote",
      display: false,
      showDay: false,
      msg: "活动已经结束",
    }
  },
  async onLoad(query) {
    // 添加事件监听
    uni.$on("update", (data) => {
      console.log("监听到事件来自 update ，携带参数 msg 为：" + data.msg)
      this._getActivity()
      this._getItems()
    })
    // 添加防抖
    this.dbouncedGetItems = _.debounce(this._getItems, 500)
    /**
     * 1. 下载活动信息 通过活动列表页传入的id筛选
     * 2. 下载选手信息
     */
    // 增加访问量
    try {
      await putVisits(query?.id)
    } catch (error) {
      console.error("增加访问量失败", error)
    }

    // 1. 记录传入参数
    this.actId = query?.id
    // 2. 下载活动信息
    await this._getActivity()
    // 设置标题
    uni.setNavigationBarTitle({
      title: this.activity.name,
    })
    // 3. 下载选手信息
    await this._getItems()
    // 4. 存入当前活动id
    let globalData: any = getApp().globalData
    globalData.currentActId = +query?.id
    // 5. 计算时间
    // 获取活动时间
    let {startTime, endTime, status}: any = this.activity
    //  获取当前时间
    let now = moment()
    startTime = moment(startTime)
    endTime = moment(endTime)
    let duration = moment.duration(startTime.diff(now))

    // 根据状态显示不同内容
    if (status === "ISCOMING") {
      this.msg = "活动开始还有"
      this.setCountDown(duration)
    } else if (status === "ONGOING") {
      this.msg = "活动结束还有"
      duration = moment.duration(endTime.diff(now))
      this.setCountDown(duration)
    }
    console.log(`now:${now}, startTime:${startTime}, endTime:${endTime}`)
  },
  onUnload() {
    uni.$off("update", function (data) {
      console.log("监听到事件来自 update ，携带参数 msg 为：" + data.msg)
    })
  },
  methods: {
    setCountDown: function (duration: moment.Duration) {
      if (duration.days() > 0) {
        this.showDay = true
        this.day = duration.days()
        this.hour = duration.hours()
        this.min = duration.minutes()
        this.sec = duration.seconds()
      } else {
        this.hour = duration.hours()
        this.min = duration.minutes()
        this.sec = duration.seconds()
      }
    },
    handleInput(e: any) {
      this.code = e
      this.dbouncedGetItems()
    },
    // 获取活动信息
    async _getActivity() {
      try {
        // 下载最新活动信息
        let {data}: any = await getActivities(1)
        // 根据actId筛选
        this.activity = data.data.filter(
            (el: Iactivity) => el.id == this.actId
        )[0]
      } catch (error) {
        console.error("下载活动信息出错", error)
        uni.showToast({
          title: `${error}`,
        })
        this.activity = activities.filter(
            (el: Iactivity) => el.id === this.actId
        )[0]
      }
    },
    async _getItems() {
      try {
        let {data} = await getItems({
          activityId: this.actId,
          code: this.code,
        })

        this.items = data.data
      } catch (error) {
        this.items = items
        console.error("获取选手信息出错", error)
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
