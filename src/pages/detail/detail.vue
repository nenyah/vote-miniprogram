<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 08:48:06
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-10 10:46:49
-->
<template>
  <view class="bg-purple">
    <title></title>
	<stats></stats>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import title from "@/components/title/title.vue"
import stats from "@/components/stats/stats.vue"
export default Vue.extend({
  data() {
    return {}
  },
  components: {
	title,
	stats,
  },
})
</script>

<style></style>
