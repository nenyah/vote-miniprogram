<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-10 11:26:21
-->
<template>
  <view class="bg-purple">
    <banner></banner>
    <title></title>
    <stats :content="indexstats">
      <view
        class="mt-2 p-2 text-gray-100 text-center border border-r-0  border-l-0 border-gray-100 border-solid"
      >
        活动结束时间还有{{ lastdate }}
      </view>
    </stats>
    <brief-desc></brief-desc>
    <search-bar></search-bar>
    <vote-list :items="items" :pageType="pageType"></vote-list>
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
    console.log("Vue", Vue)
  },
  methods: {},
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

<style lang="scss"></style>
