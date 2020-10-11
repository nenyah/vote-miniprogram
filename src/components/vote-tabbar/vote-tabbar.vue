<template>
  <view style="background-color:#ec7db0; width: 750rpx;"
        class="flex items-center h-12 fixed bottom-0 left-0 text-gray-500 z-50">
    <view :class="{'text-gray-100':activeIndex==0}"
          class="flex-1 text-center box-border py-1 "
          @click="handleClick(0)"
    >
      <view class="fa fa-fire text-2xl"></view>
      <view class="text-xs">投票</view>
    </view>
    <view :class="{'text-gray-100':activeIndex==1}"
          class="flex-1 text-center box-border py-1"
          @click="handleClick(1)"
    >
      <view class="fa fa-info-circle text-2xl"></view>
      <view class="text-xs">详情</view>
    </view>
    <view :class="{'text-gray-100':activeIndex==2}"
          class="flex-1 text-center box-border py-1"
          @click="handleClick(2)"
    >
      <view class="fa fa-bar-chart text-2xl"></view>
      <view class="text-xs">排名</view>
    </view>
  </view>
</template>


<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component({})
export default class VoteTabbar extends Vue {
  @Prop(Number) private activeIndex!: number

  handleClick(value: number) {
    const pages = ["index", "desc", "rank"]
    if (value === this.activeIndex) {
      return
    }
    uni.redirectTo({
      url: `/pages/${pages[value]}/${pages[value]}`,
    })
  }
};
</script>

<style scoped>

</style>

<style scoped>

</style>