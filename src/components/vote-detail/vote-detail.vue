<template>
  <view class="p-4 text-gray-200">
    <main-title :title="title"></main-title>
    <view class="mt-2 text-gray-600" v-for="(msg,idx) in desc" :key="idx">{{ msg }}</view>
  </view>
</template>

<script lang="ts">
import mainTitle from "@/components/main-title/main-title.vue"
import {Component, Prop, Vue} from "vue-property-decorator"
import {Iactivity} from "@/common/activity"

@Component({
  components: {
    mainTitle,
  },
  filters: {
    formatMsg(value: string) {
      return value.replace(/\n/, "<br/>")
    }
  }
})
export default class VoteDetail extends Vue {
  @Prop() private activity!: Iactivity
  private title = "活动详情"

  get desc() {
    return this.activity?.description?.split("\n")
  }
}
</script>

<style lang="scss" scoped>
</style>
