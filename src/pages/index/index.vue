<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-10 10:25:37
-->
<template>
  <view class="bg-purple">
    <banner></banner>
    <stats></stats>
    <brief-desc></brief-desc>
    <search-bar></search-bar>
    <vote-list :items="items" :pageType="pageType"></vote-list>
    <vote-footer></vote-footer>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import banner from "@/components/banner/banner.vue"
import stats from "@/components/stats/stats.vue"
import briefDesc from "@/components/brief-desc/brief-desc.vue"
import searchBar from "@/components/search-bar/search-bar.vue"
import voteList from "@/components/vote-list/vote-list.vue"
import voteFooter from "@/components/footer/footer.vue"
import { items } from "@/mock/store"
export default Vue.extend({
  data() {
    return {
      items,
      pageType: "index",
    }
  },
  onLoad() {},
  methods: {},
  components: {
    banner,
    stats,
    briefDesc,
    searchBar,
    voteList,
    voteFooter,
  },
})
</script>

<style lang="scss"></style>
