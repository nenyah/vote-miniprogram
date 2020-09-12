<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-11 13:17:42
-->
<template>
  <view class="bg-purple">
    <!-- 广告轮播图 -->
    <banner></banner>
    <!-- 主题名称 -->
    <title></title>
    <!-- 统计区域 -->
    <stats :content="indexstats">
      <view class="mt-2 p-2 text-gray-100 text-center diff-time-box">
        活动结束时间还有{{ lastdate }}
      </view>
    </stats>
    <!-- 规则区域 -->
    <brief-desc></brief-desc>
    <!-- 搜索区域 -->
    <search-bar></search-bar>
    <!-- 项目列表区域 -->
    <vote-list :items="items" :pageType="pageType"></vote-list>
    <!-- 脚注区域 -->
    <vote-footer></vote-footer>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import banner from "@/components/banner/banner.vue"
import title from "@/components/title/title.vue"
import stats from "@/components/stats/stats.vue"
import briefDesc from "@/components/brief-desc/brief-desc.vue"
import searchBar from "@/components/search-bar/search-bar.vue"
import voteList from "@/components/vote-list/vote-list.vue"
import voteFooter from "@/components/footer/footer.vue"
import request from "@/utils/request"
import { items, indexstats } from "@/mock/store"
export default Vue.extend({
  data() {
    return {
      items,
      indexstats,
      lastdate: "2天",
      pageType: "index",
    }
  },
  async onLoad() {
    /**
     * 1. 下载活动信息
     * 2. 下载选手信息
     * TODO: 思考做成一个接口
     */
    this.getActivate()
    this.$_request({ url: "/api/user" })
      .then((res: object) => console.log(res))
      .catch((err: object) => console.error(err))
  },
  methods: {
    getActivate() {},
  },
  components: {
    banner,
    title,
    stats,
    briefDesc,
    searchBar,
    voteList,
    voteFooter,
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
</style>
