<template>
  <view>
    <view v-if="actId < 0" class="text-gray-900 py-2 p-5">
      <view
        v-for="activity in activities"
        :key="activity.id"
        class="my-4 text-center text-gray-500 rounded-lg shadow-lg"
      >
        <view :data-id="activity.id" @click="toIndex">
          <image
            :src="formatUrl(activity)"
            mode="aspectFill"
            class="rounded rounded-b-none w-full h-24"
          ></image>
          <view class="p-2 text-left">
            <view class="text-gray-900">{{ activity.name }}</view>
            <view class="flex items-center">
              <view class="fa fa-group mr-1 text-red-300 text-center"></view>
              <view>{{ activity.stats[1].value }}人参与，已投票：</view>
              <view>{{ activity.stats[2].value }}</view>
            </view>
            <view class="flex items-center">
              <view class="fa fa-clock-o mr-1 text-red-300 text-center"></view>
              <view> {{ formatTime(activity.endTime) }} 结束 </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-else class="bg-purple">
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
              color="#fff"
              background-color=""
              splitorColor="#fff"
              :day="day"
              :hour="hour"
              :minute="min"
              :second="sec"
              :showDay="showDay"
            ></uni-countdown>
          </view>
          <view v-else>{{ msg }}</view>
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
      <search-bar @updateItem="handleInput" @clear="handleClear"></search-bar>
      <!-- 项目列表区域 -->
      <vote-list
        :items="items"
        :itemType="itemType"
        @tolower="tolower"
      ></vote-list>
      <vote-footer :content="activity.name"></vote-footer>
      <view>
        <!-- uni-app未封装，但可直接使用微信原生的official-account组件-->
        <!-- #ifdef MP-WEIXIN -->
        <official-account></official-account>
        <!-- #endif -->
      </view>
      <!-- 脚注区域 -->
      <view
        class="text-gray-100 bg-orange-500 rounded-full flex justify-center items-center"
        @click="batchVote"
        style="width: 3rem;height: 3rem;position: fixed;bottom: 6rem;right: 0.5rem;z-index: 9999;"
      >
        {{ total }}
      </view>

      <view
        class="text-gray-900 bg-gray-200 rounded-full flex justify-center items-center"
        @click="back"
        style="width: 3rem;height: 3rem;position: fixed;bottom: 2rem;right: 0.5rem;z-index: 9999;"
      >
        返回
      </view>
    </view>
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
import { getItems } from "@/servise/items"
import { getActivities, putVisits } from "@/servise/activates"
import { activities, items } from "@/mock/store"
import moment from "moment"
import { Iactivity, IglobalData, Iitem } from "@/common/interface"
import * as _ from "lodash"
import { getCode, login } from "@/servise/login"
import { isLogin } from "@/utils/check"
import { handleVote } from "@/servise/vote"

moment().locale("zh-cn")

interface Query {
  id: number
}
let app = getApp()
export default Vue.extend({
  data() {
    return {
      items: [] as Array<Iitem>,
      itemids: [] as Array<Number>,
      actId: -1,
      activities: [] as Iactivity[],
      activity: {} as Iactivity,
      code: "",
      dbouncedGetItems: () => {},
      dbouncedGetActivity: () => {},
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
      itemType: "vote",
      display: false,
      showDay: false,
      msg: "活动已经结束",
      pageNo: 0,
      pageSize: 10,
      total: "0/0",
    }
  },
  async onLoad(query) {
    // 后端登录
    await login()

    // 1. 服务器接口获取活动信息
    this.activities = await this._getActivities()
    // 2. 活动信息存入globaldata
    let globalData: any = getApp().globalData
    globalData.activities = this.activities
    // 添加防抖
    this.dbouncedGetItems = _.debounce(this._getItems, 500)
    this.dbouncedGetActivity = _.debounce(this._getActivity, 500)
    // 添加事件监听
    uni.$on("update", (data) => {
      console.log("监听到事件来自 update ，携带参数 msg 为：" + data.msg)
      this.dbouncedGetItems()
      this.dbouncedGetActivity()
    })
    uni.$on("add", (data) => {
      console.log("监听事件来自add,携带参数itemid为", data.itemid)
      this.itemids.push(data.itemid)
    })
    uni.$on("sub", (data) => {
      const startIndex = this.itemids.indexOf(data.itemid)
      this.itemids.splice(startIndex, 1)
      console.log("监听事件来自sub,携带参数itemid为", data.itemid, startIndex)
    })
  },
  onUnload() {
    uni.$off("update", function(data) {
      console.log("监听到事件来自 update ，携带参数 msg 为：" + data.msg)
    })
    uni.$off("add", (data) => {
      console.log("监听事件来自add,携带参数itemid为", data.itemid)
      this.itemids.push(data.itemid)
    })
    uni.$off("sub", (data) => {
      const startIndex = this.itemids.indexOf(data.itemid)
      this.itemids.splice(startIndex, 1)
      console.log("监听事件来自sub,携带参数itemid为", data.itemid, startIndex)
    })
  },
  methods: {
    async batchVote() {
      console.log("批量投票")
      if (this.itemids.length == 0) {
        uni.showToast({
          title: "请选择选手！",
          icon: "none",
        })
        return
      }
      // 没有openid
      if (isLogin()) {
        try {
          await login()
        } catch (err) {
          console.error("获取code失败", err)
        }
      }
      try {
        // 上传投票信息
        let res = await Promise.all(
          this.itemids.map((el: any) => handleVote(el))
        )
        console.log("上传之后", res)
        if (res[0].data.success !== true) {
          uni.showModal({
            content: res[0].data.errorMsg,
            showCancel: false,
          })
          return
        }
        uni.showModal({
          content: "投票成功！",
          showCancel: false,
          success: (res) => {
            // 上传成功后刷新页面
            uni.$emit("update", { msg: "页面更新" })
          },
        })
      } catch (err) {
        console.error("上传投票信息失败", err)
      }
    },
    tolower() {
      this.dbouncedGetItems()
    },
    back() {
      this.actId = -1
      let globaldata = getApp().globalData as IglobalData
      globaldata.currentActId = -1
    },
    // 获取活动信息
    async _getActivities() {
      try {
        let { data }: any = await getActivities()
        console.log("打印解析data", data)

        return data.data
      } catch (error) {
        return activities
      }
    },
    async toIndex(e: any) {
      this.actId = e.currentTarget.dataset.id
      let globaldata = getApp().globalData as IglobalData
      globaldata.currentActId = e.currentTarget.dataset.id
      // 1. 增加访问量
      putVisits(e.currentTarget.dataset.id)
        .then((res) => {
          console.log("增加访问量成功", res)
        })
        .catch((err) => {
          console.error("增加访问量失败", err)
        })
      // 2. 下载活动信息
      await this._getActivity()
      // 设置标题
      uni.setNavigationBarTitle({
        title: this.activity?.name,
      })
      // 3. 下载选手信息
      await this._getItems()
      // 4. 判断活动状态
      this.setTime()
      this.total = `0/${this.activity.rule[0].value}`
    },
    setTime() {
      let { startTime, endTime, status }: any = this.activity
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
    },

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
    },
    handleClear() {
      this.pageNo = 0
      this.items = []
      this.code = ""
      this.dbouncedGetItems()
    },
    handleInput(e: any) {
      this.code = e
      this.dbouncedGetItems()
    },
    // 获取活动信息
    async _getActivity() {
      // 根据actId筛选
      this.activity = this.activities.filter(
        (el: Iactivity) => el.id == this.actId
      )[0]
    },
    async _getItems() {

      // 判断是否还有新的内容
      if (this.items.length % this.pageSize !== 0) {
        return
      }

      if (this.code.length > 0) {
        let { data } = await getItems({
          activityId: this.actId,
          code: this.code,
        })

        this.items = data.data
        return
      }
      this.pageNo = this.pageNo + 1
      let { data } = await getItems({
        pageNo: this.pageNo,
        activityId: this.actId,
        code: this.code,
      })

      this.items = [...this.items, ...data.data]
    },
  },
  computed: {
    formatUrl() {
      return (params: Iactivity) => {
        return params.bannerImg[0]
      }
    },
    formatTime() {
      return (params: string) => {
        return params.substr(0, 16).replace("T", " ")
      }
    },
  },
  watch: {
    itemids(newValue, oldValue) {
      const selectedItemNum = this.itemids.length
      const totalNum = this.activity.rule[0].value
      if (selectedItemNum < totalNum) {
        this.total = `${selectedItemNum}/${this.activity.rule[0].value}`
      } else {
        this.total = "投票"
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

function newFunction() { let { startTime,endTime,status }: any=this.activity //
获取当前时间 let now=moment() startTime=moment(startTime)
endTime=moment(endTime) let duration=moment.duration(startTime.diff(now)) //
根据状态显示不同内容 if(status==="ISCOMING") { this.msg="活动开始还有"
this.setCountDown(duration) } else if(status==="ONGOING") {
this.msg="活动结束还有" duration=moment.duration(endTime.diff(now))
this.setCountDown(duration) } }
