<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-07 16:59:44
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-27 10:00:19
-->
<template>
  <view class="bg-purple h-full pt-2 px-2">
    <view v-if="actId < 0" class="text-gray-100 text-center"
      >还没有选择活动哦</view
    >
    <view v-else>
      <title :content="activity.name"></title>
      <vote-list
        :items="sortItems"
        :pageType="pageType"
        @tolower="tolower"
      ></vote-list>
      <vote-footer :content="activity.name"></vote-footer>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import title from "@/components/title/title.vue"
import voteList from "@/components/vote-list/vote-list.vue"
import voteFooter from "@/components/footer/footer.vue"
import { getItems } from "@/servise/items"
import { Iactivity, Iitem, IglobalData } from "@/common/interface"
import { items } from "@/mock/store"
import * as _ from "lodash"

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
      dbouncedGetItems: () => {},
      pageNo: 0,
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
    tolower() {
      this.dbouncedGetItems()
    },
    init() {
      const { activities, currentActId } = app.globalData as IglobalData

      this.actId = currentActId
      if (currentActId > -1) {
        this.dbouncedGetItems()
      }
    },
    async _getItems() {
      // 获取全局数据
      let { currentActId, activities } = app.globalData as IglobalData
      // 获取活动
      this.activity = activities.filter((el) => el.id == currentActId)[0]
      // 判断是否还有新的内容
      if (this.items.length % 10 !== 0) {
        return
      }
      this.pageNo = this.pageNo + 1
      let { data } = await getItems({
        pageNo: this.pageNo,
        activityId: this.actId,
      })
      console.log("返回数据", data.data)

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
  },
})
</script>

<style></style>
