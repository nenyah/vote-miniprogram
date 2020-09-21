<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 14:38:03
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-21 13:41:51
-->
<template>
  <view class="pt-16 px-4 bg-color text-gray-200">
    <main-title :title="title"></main-title>
    <view class="mt-2">{{ activity.description }}</view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import mainTitle from "@/components/main-title/main-title.vue"

export default Vue.extend({
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  components: {
    mainTitle,
  },
  data() {
    return {
      title: "活动详情",
    }
  },
  onLoad() {},
  methods: {},
})
</script>

<style lang="scss" scoped>
.bg-color {
  background-image: $rule-bg-base64-code;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
