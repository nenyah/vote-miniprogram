<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:22:51
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-14 16:37:12
-->
<template>
  <view class="bg-color pt-4">
    <!-- 活动规则 -->
    <vote-rule :acitivity="acitivity"></vote-rule>
    <!-- 活动详情 -->
    <view class="text-white flex px-4">
      <view class="attr">
        <view class="fa fa-clock-o text-orange-500 mr-2"></view>
        活动详情：
      </view>
      <view class="flex" @click="display = !display">
        {{ display ? "收起" : "展开" }}
        <view class="text-orange-500 ml-2">></view>
      </view>
    </view>
    <!-- 详情描述 -->
    <view v-if="display" class="my-3 text-gray-100 px-4">
      {{ activity.desc }}
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import voteRule from "@/components/vote-rule/vote-rule.vue"
export default Vue.extend({
  props: {
    activity: { type: Object, required: true },
  },
  data() {
    return {
      display: false,
    }
  },
  onLoad() {},
  methods: {
    expand() {},
  },
  components: {
    voteRule,
  },
})
</script>

<style lang="scss" scoped>
.bg-color {
  background-image: $rule-bg-base64-code;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
