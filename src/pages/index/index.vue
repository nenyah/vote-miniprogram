<template>
  <view class="bg-theme-p-1 flex flex-col items-center">
    <!--      品牌介绍-->
    <top-show :top10="top10" :top3="top3"></top-show>
    <!-- 广告轮播图 -->
    <banner :src="activity.bannerImg"></banner>
    <!-- 主题名称 -->
    <title :content="activity.name"></title>
    <!-- 统计区域 -->
    <stats :content="activity.stats">
      <view
          class="mt-2 p-2 text-gray-100 text-center diff-time-box flex justify-center"
      >
        <view v-if="!(activity.status === 'ENDED')">
          {{ msg }}
          <uni-countdown
              :day="day"
              :hour="hour"
              :minute="min"
              :second="sec"
              :showDay="showDay"
              background-color=""
              color="#fff"
              splitorColor="#fff"
          ></uni-countdown>
        </view>
        <view v-else>{{ msg }}</view>
      </view>
    </stats>
    <!-- 规则区域 -->
    <view class="pt-4 my-2 bg-gray-100 w-11--12 rounded">
      <!-- 活动规则 -->
      <vote-rule :activity="activity"></vote-rule>
      <!-- 活动详情 -->
      <view class="text-red-300 flex px-4">
        <view class="attr">
          <view class="fa fa-clock-o text-red-300 mr-2"></view>
          活动详情：
        </view>
        <view class="flex" @click="display = !display">
          {{ display ? "收起" : "展开" }}
          <view class="text-orange-500 ml-2">></view>
        </view>
      </view>
      <!-- 详情描述 -->
      <view v-if="display" v-for="msg in desc" class="my-3 text-gray-600 px-4">
        {{ msg }}
      </view>
    </view>
    <!-- 搜索区域 -->
    <search-bar @clear="handleClear" @updateItem="handleInput"></search-bar>
    <view class="text-gray-100 w-full">
      <uni-segmented-control
          :current="current"
          :values="cateItem"
          active-color="#e271a6"
          style-type="text"
          @clickItem="onClickItem"
      ></uni-segmented-control>
    </view>
    <!-- 项目列表区域 -->
    <vote-list
        :itemType="itemType"
        :items="items"
        @tolower="tolower"
    ></vote-list>
    <vote-footer :content="activity.name"></vote-footer>
    <view style="width:100%;position:relative;background:gray;">
      <!-- uni-app未封装，但可直接使用微信原生的official-account组件-->
      <!-- #ifdef MP-WEIXIN -->
      <official-account></official-account>
      <!-- #endif -->
    </view>
    <!-- 脚注区域 -->
    <vote-tabbar :activeIndex="activeIndex"></vote-tabbar>
    <modal v-show="showModal" :src="canvasUrl" @hide="hide"></modal>
  </view>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import banner from "@/components/banner/banner.vue"
import title from "@/components/title/title.vue"
import stats from "@/components/stats/stats.vue"
import voteRule from "@/components/vote-rule/vote-rule.vue"
import searchBar from "@/components/search-bar/search-bar.vue"
import voteList from "@/components/vote-list/vote-list.vue"
import voteFooter from "@/components/footer/footer.vue"
import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
import topShow from "@/components/top-show/top-show.vue"
import voteTabbar from "@/components/vote-tabbar/vote-tabbar.vue"
import {IglobalData} from "@/common/interface"
import {getActivities, putVisits} from "@/servise/activates"
import moment from "moment"
import {getCate} from "@/servise/category"
import {getItems} from "@/servise/items"
import * as _ from "lodash"
import {Iitem} from "@/common/Item"
import {Iactivity} from "@/common/activity"

@Component({
  components: {
    banner,
    title,
    stats,
    voteRule,
    searchBar,
    voteList,
    voteFooter,
    uniCountdown,
    uniSegmentedControl,
    topShow,
    voteTabbar,
  }
})
export default class Index extends Vue {
  private activities = [] as Iactivity[]
  private activity = {} as Iactivity
  private items = [] as Iitem[]
  private code = ""
  private day = 0
  private hour = 0
  private min = 0
  private sec = 0
  private itemType = "vote"
  private actId = -1
  private msg = "活动已经结束"
  private showDay = false
  private display = false
  private categories = [] as any
  private cateItem = [] as Array<string>
  private current = 0
  private categoryId = -1
  private pageNo = 0
  private pageSize = 10
  private activeIndex = 0
  private top10 = []
  private top3 = [] as any

  get showModal() {
    return this.$store.state.showModal
  }

  get canvasUrl() {
    return this.$store.state.canvasUrl
  }
  get desc() {
    return this.activity.description.split("\n")
  }
  private dbouncedGetActivity = () => {
  }

  async onLoad(query: { actId: number }) {
    // 添加防抖
    this.dbouncedGetItems = _.debounce(this._getItems, 500)
    this.dbouncedGetActivity = _.debounce(this._getActivity, 500)
    // 添加事件监听
    uni.$on("update", async (data) => {
      console.log("监听到事件来自 update ，携带参数 msg 为：" + data.msg)
      this.items = []
      this.pageNo = 0
      this.activities = await this._getActivities()
      await this._TOP10()
      await this._TOP3()
      this.dbouncedGetActivity()
      this.dbouncedGetItems()
    })
    let globaldata = getApp().globalData as IglobalData
    if (!query.actId) {
      console.log("query.actId:::", query.actId)
      this.actId = globaldata.currentActId
    } else {
      this.actId = query.actId
      globaldata.currentActId = query.actId
      // 1. 增加访问量
      try {
        await putVisits(query.actId)
      } catch (err) {
        console.error("增加访客失败:::", err)
      }
    }
    this.activities = globaldata.activities.length > 0
        ? globaldata.activities
        : await this._getActivities()
    // 2. 下载活动信息
    await this._getActivity()
    // 设置标题
    uni.setNavigationBarTitle({
      title: this.activity?.name,
    })
    // 3. 判断活动状态
    this.setTime()
    // 4. 类目信息
    await this._getCate()
    // 5. 下载选手信息
    await this._getItems()
    await this._TOP10()
    await this._TOP3()
  }

  onUnload() {
    uni.$off("update", async (data) => {
      console.log("监听到事件来自 update ，携带参数 msg 为：" + data.msg)
      this.items = []
      this.pageNo = 0
      this.activities = await this._getActivities()
      await this._TOP10()
      await this._TOP3()
      this.dbouncedGetActivity()
      this.dbouncedGetItems()
    })

  }

  hide() {
    console.log("parent receive:::")
    this.$store.commit("toggleModal")
  }

  // private showModal = false
  private dbouncedGetItems = () => {
  }

  handleClear() {
    this.pageNo = 0
    this.items = []
    this.code = ""
    this.dbouncedGetItems()
  }

  handleInput(e: any) {
    this.code = e
    this.dbouncedGetItems()
  }

  tolower() {
    this.dbouncedGetItems()
  }

  onClickItem(e: any) {
    if (this.current !== e.currentIndex) {
      this.current = e.currentIndex
    }
    this.categoryId = this.categories[e.currentIndex].id
    this.pageNo = 0
    this.items = []
    this.dbouncedGetItems()
  }

// 获取活动信息
  async _getActivities() {
    try {
      let {data}: any = await getActivities()
      return data.data
    } catch (error) {
      uni.showToast({
        title: "获取活动信息错误",
        icon: "none",
      })
    }
  }

  // 获取活动信息
  async _getActivity() {
    // 根据actId筛选
    this.activity = this.activities.filter(
        (el: Iactivity) => el.id == this.actId
    )[0]
  }

  setTime() {
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
  }

  setCountDown(duration: moment.Duration) {
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
  }

  async _getCate() {
    try {
      let res = await getCate({activityId: this.actId})
      this.categories = res.data
      this.cateItem = res.data.map((el: any) => el.name)
      this.categoryId = res.data[this.current].id
    } catch {
      uni.showToast({
        title: "获取类目信息错误",
        icon: "none",
      })
    }
  }

  async _getItems() {
    if (this.code.length > 0) {
      let {data} = await getItems({
        activityId: this.actId,
        code: this.code,
        categoryId: this.categoryId,
      })

      this.items = data.data
      return
    }
    // 判断是否还有新的内容
    if (this.items.length % this.pageSize !== 0) {
      return
    }


    this.pageNo = this.pageNo + 1
    let {data} = await getItems({
      pageNo: this.pageNo,
      activityId: this.actId,
      code: this.code,
      categoryId: this.categoryId,
    })

    this.items = [...this.items, ...data.data]
  }


  async _TOP10() {
    try {
      const res = await getItems({
        activityId: this.actId,
      })
      this.top10 = res.data.data.filter((data: Iitem) => +data.stats[0].value > 0)
      console.log("top10:::", res.data)
    } catch (err) {
      console.error("10强下载错误:::", err)
    }
  }

  async _TOP3() {
    try {
      const res = await Promise.all(this.categories.map((el: any) => {
        return getItems({
          activityId: this.actId,
          categoryId: el.id,
          pageSize: 3,
        })
      }))
      this.top3 = res.map((el: any, index: number) => {
        const res: Iitem[] = el.data.data
        return {
          categoryName: this.categories[index].name,
          data: res.filter((data: Iitem) => +
              data.stats[0].value > 0),
        }
      })
      console.log("top3:::", res)
    } catch (e) {
      console.error("获取各区域三强失败:::", e)
    }
  }
};
</script>

<style scoped>

</style>
