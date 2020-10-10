<template>
  <view style="background-color:#ec7db0; width: 750rpx;"
        class="flex items-center h-12 absolute bottom-0 left-0 text-gray-500">
    <view class="flex-1 text-center box-border py-1">
      <view class="fa fa-fire"></view>
      <view>投票</view>
    </view>
    <view class="flex-1 text-center box-border py-1">
      <view class="fa fa-info-circle"></view>
      <view>详情</view>
    </view>
    <view class="flex-1 text-center box-border py-1">
      <view class="fa fa-bar-chart"></view>
      <view>排名</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "vote-tabbar"
}
</script>

<style scoped>

</style>