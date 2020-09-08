<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-07 16:59:44
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-08 15:56:25
-->
<template>
  <view>
    <title></title>
    <vote-list :items="sortItems" :pageType="pageType"></vote-list>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import { Iitem, items } from "@/mock/store"
import title from "@/components/title/title.vue"
import voteList from "@/components/vote-list/vote-list.vue"

export default Vue.extend({
  data() {
    return {
      items,
      pageType: "rank",
    }
  },
  onLoad() {},
  methods: {},
  computed: {
    sortItems(): Array<Iitem> {
      return this.items.sort(
        (a: Iitem, b: Iitem) => <number>b.vote - <number>a.vote
      )
    },
  },
  components: {
    title,
    voteList,
  },
})
</script>

<style></style>
