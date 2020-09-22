<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-07 16:59:44
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-22 10:45:30
-->
<template>
  <view class="bg-purple h-full pt-2 px-2">
    <title :content="activity.name"></title>
    <vote-list :items="sortItems" :pageType="pageType"></vote-list>
    <vote-footer :content="activity.name"></vote-footer>
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

interface Query {
  id: number
}

let app = getApp()
export default Vue.extend({
  data() {
    return {
      items,
      activity: {} as Iactivity,
      pageType: "rank",
    }
  },
  async onLoad() {
    this._getItems()
  },
  async onShow() {
    this._getItems()
  },
  // TODOS: 下拉加载更多
  methods: {
    async _getItems() {
      // 获取全局数据
      let { currentActId, activities } = app.globalData as IglobalData
      // 获取活动
      this.activity = activities.filter((el) => el.id == currentActId)[0]
      console.log("下载项目")
      try {
        // 下载选手信息
        let { data } = await getItems({ activityId: currentActId })
        console.log("获取选手信息", data.data)

        this.items = data.data
      } catch (error) {
        uni.showToast({
          title: `${error}`,
        })
        this.items = items
      }
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
