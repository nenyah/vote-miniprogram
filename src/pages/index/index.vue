<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-08 14:23:55
-->
<template>
  <view class="content">
    <banner></banner>
    <stats></stats>
    <brief-desc></brief-desc>
    <search-bar></search-bar>
    <vote-list></vote-list>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import banner from "@/components/banner/banner.vue"
import stats from "@/components/stats/stats.vue"
import briefDesc from "@/components/brief-desc/brief-desc.vue"
import searchBar from "@/components/search-bar/search-bar.vue"
import voteList from "@/components/vote-list/vote-list.vue"

export default Vue.extend({
  data() {
    return {}
  },
  onLoad() {},
  methods: {},
  components: {
    banner,
    stats,
    briefDesc,
    searchBar,
    voteList,
  },
})
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
