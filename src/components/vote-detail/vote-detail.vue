<template>
  <view class="p-4 text-gray-200">
    <main-title :title="title"></main-title>
    <view class="mt-2 text-gray-600">{{ activity.description }}</view>
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
</style>
