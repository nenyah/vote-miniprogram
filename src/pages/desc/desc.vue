<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 08:45:00
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-09 16:46:12
-->
<template>
  <view class="bg-purple">
    <title></title>
    <vote-rule></vote-rule>
    <vote-detail></vote-detail>
    <vote-footer></vote-footer>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import title from "@/components/title/title.vue"
import voteRule from "@/components/vote-rule/vote-rule.vue"
import voteDetail from "@/components/vote-detail/vote-detail.vue"
import voteFooter from "@/components/footer/footer.vue"
export default Vue.extend({
  data() {
    return {}
  },
  onLoad() {},
  methods: {},
  components: {
    title,
    voteRule,
    voteDetail,
    voteFooter,
  },
})
</script>

<style></style>
