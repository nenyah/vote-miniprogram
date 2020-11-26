<template>
  <view class="bg-color pt-4">
    <vote-rule :acitivity="acitivity"></vote-rule>
    <view class="text-white flex px-4">
      <view class="attr">
        <view class="fa fa-clock-o text-orange-500 mr-2"></view>
        活动详情：
      </view>
      <view class="flex" @tap="display = !display">
        {{ display ? "收起" : "展开" }}
        <view class="text-orange-500 ml-2">></view>
      </view>
    </view>
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
