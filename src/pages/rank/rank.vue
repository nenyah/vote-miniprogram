<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-07 16:59:44
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-29 16:22:11
-->
<template>
  <view class="bg-theme-p-1 min-h-full pt-2 px-2">
    <view v-if="actId < 0" class="text-gray-100 text-center"
    >还没有选择活动哦
    </view
    >
    <view v-else>
      <title :content="activity.name"></title>
      <view class="text-gray-100">
        <uni-segmented-control
            :current="current"
            :values="cateItem"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#e271a6"
        ></uni-segmented-control>
      </view>
      <vote-list
          :items="sortItems"
          :pageType="pageType"
          @tolower="tolower"
      ></vote-list>
      <vote-footer :content="activity.name"></vote-footer>
      <vote-tabbar :activeIndex="activeIndex"></vote-tabbar>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import title from "@/components/title/title.vue"
import voteList from "@/components/vote-list/vote-list.vue"
import voteFooter from "@/components/footer/footer.vue"
import voteTabbar from "@/components/vote-tabbar/vote-tabbar.vue"
import {getItems} from "@/servise/items"
import {Iactivity, IglobalData, Iitem} from "@/common/interface"
import * as _ from "lodash"
import {getCate} from "@/servise/category"

interface Query {
  id: number
}

let app = getApp()
export default Vue.extend({
  data() {
    return {
      items: [] as Array<Iitem>,
      actId: -1,
      activity: {} as Iactivity,
      pageType: "rank",
      dbouncedGetItems: () => {
      },
      pageNo: 0,
      current: 0,
      categories: [] as any,
      cateItem: [] as any,
      categoryId: undefined,
      activeIndex: 2,
    }
  },
  async onLoad() {
    this.init()
    this.dbouncedGetItems = _.debounce(this._getItems, 500)
  },
  async onShow() {
    this.init()
  },
  methods: {
    onClickItem(e: any) {
      console.log("点击item", e)

      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
      }
      this.categoryId = this.categories[e.currentIndex].id
      this.pageNo = 0
      this.items = []
      this.dbouncedGetItems()
    },
    tolower() {
      this.dbouncedGetItems()
    },
    async init() {
      const {activities, currentActId} = app.globalData as IglobalData

      this.actId = currentActId
      if (currentActId > -1) {
        if (this.cateItem.length == 0) {
          await this._getCate()
        }
        this.dbouncedGetItems()
      }
    },
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
    },
    async _getItems() {
      // 获取全局数据
      let {currentActId, activities} = app.globalData as IglobalData
      // 获取活动
      this.activity = activities.filter((el) => el.id == currentActId)[0]
      // 判断是否还有新的内容
      if (this.items.length % 10 !== 0) {
        return
      }
      this.pageNo = this.pageNo + 1
      let {data} = await getItems({
        pageNo: this.pageNo,
        activityId: this.actId,
        categoryId: this.categoryId,
      })

      this.items = [...this.items, ...data.data]
    },
  },
  computed: {
    sortItems(): Array<Iitem> {
      return this.items.sort(
          (a: Iitem, b: Iitem) =>
              <number>b?.stats[0].value - <number>a?.stats[0].value
      )
    },
  },
  components: {
    title,
    voteList,
    voteFooter,
    voteTabbar,
  },
})
</script>

<style></style>
