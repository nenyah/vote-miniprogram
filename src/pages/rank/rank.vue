<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-07 16:59:44
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-09 16:46:30
-->
<template>
  <view class="bg-purple h-full pt-2 px-2">
    <title></title>
    <vote-list :items="sortItems" :pageType="pageType"></vote-list>
    <vote-footer></vote-footer>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import { Iitem } from "@/common/interface"
import { items } from "@/mock/store"
import title from "@/components/title/title.vue"
import voteList from "@/components/vote-list/vote-list.vue"
import voteFooter from "@/components/footer/footer.vue"

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
