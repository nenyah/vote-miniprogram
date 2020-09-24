<template>
  <view class="bg-gray-200 h-full">
    <view class="bg-purple-300 w-full h-40"> </view>
    <view
      class="w-10--12 mx-auto -mt-32 rounded bg-gray-100 border border-gray-100 border-solid shadow"
    >
      <view
        class="flex border-gray-300 border-solid border border-t-0 border-r-0 border-l-0 p-4"
      >
        <image
          :src="userinfo.avatarUrl"
          class="rounded-full w-16 h-16 border border-gray-300 border-solid"
        ></image>
        <view class="mx-5">
          <view class="text-gray-900 font-bold">{{ userinfo.nickName }}</view>
          <view>{{ userinfo.city }}</view>
          <view>{{ userinfo.province }}</view>
        </view>
      </view>
      <view class="flex p-2">
        <view
          class="flex-1 text-center border-l-0 border-t-0 border-b-0 border-gray-300 border-solid border-r"
        >
          <view>2</view>
          <view>参与活动</view>
        </view>
        <view class="flex-1 text-center">
          <view>100</view>
          <view>总投票数</view>
        </view>
      </view>
    </view>
    <view class=" w-10--12 mx-auto my-3 bg-gray-100 shadow p-2 box-border">
      <view @click="toHistory" class="flex justify-between items-center">
        <view class="flex items-center">
          <view class="fa fa-bookmark text-gray-500"></view>
          <view class="mx-2">查看历史投票记录</view>
        </view>
        <view class="fa fa-angle-right text-gray-500 text-lg font-bold"></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component({})
export default class profile extends Vue {
  private userinfo: Object = () => {}

  async onLoad() {
    await this.getUserInfo()
  }

  private async getUserInfo() {
    let userinfo
    try {
      let res = (await uni.getStorage({ key: "userInfo" })) as any
      userinfo = res.length > 0 ? res[1].data : undefined
      this.userinfo = userinfo
      console.log("userinfo", userinfo)
    } catch (err) {
      console.error("获取缓存用户信息失败", err)
    }
  }
  private async toHistory() {
    uni.navigateTo({
      url: `../history/history`,
    })
  }
}
</script>

<style scoped></style>
