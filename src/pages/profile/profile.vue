<template>
  <view class="bg-gray-200 h-full">
    <view class="bg-theme-p-1 w-full h-40"></view>
    <view
        class="w-10--12 mx-auto -mt-32 rounded bg-gray-100 border border-gray-100 border-solid shadow"
    >
      <view
          class="flex border-gray-300 border-solid border border-t-0 border-r-0 border-l-0 p-4"
      >
        <view v-if="showUserInfo" class="flex items-center">
          <image
              :src="userinfo.avatarUrl"
              class="rounded-full w-16 h-16 border border-gray-300 border-solid"
          ></image>
          <view class="mx-5">
            <view class="text-gray-900 font-bold">{{ userinfo.nickName }}</view>
            <view>{{ userphone.mobile | encMsg }}</view>
          </view>
        </view>
        <view v-else class="mx-auto">
          <navigator
              url="../login/login"
              class=" bg-theme-p-1 text-gray-100 py-2 px-6 rounded-full"
          >登录/注册
          </navigator
          >
        </view>
      </view>
      <view class="flex p-2">
        <view
            class="flex-1 text-center border-l-0 border-t-0 border-b-0 border-gray-300 border-solid border-r"
        >
          <view>{{ actNum }}</view>
          <view>参与活动</view>
        </view>
        <view class="flex-1 text-center">
          <view>{{ totalVoteNum }}</view>
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
import {getStorage} from "@/utils/utils"
import {getVoteStat} from "@/servise/vote"
import * as _ from "lodash"

@Component({
  filters: {
    encMsg: (msg: string) => {
      return msg.substring(0, 3) + "****" + msg.substring(7)
    }
  }
})
export default class profile extends Vue {
  private userinfo: Object = () => {
  }
  private userphone: Object = () => {
  }
  showUserInfo: Boolean = false
  actNum: number = 0
  totalVoteNum: number = 0

  async onShow() {
    await this._getUserInfo()
    await this._getUserPhone()
    if (_.isEmpty(this.userinfo) && _.isEmpty(this.userphone)) {
      return
    }
    this.showUserInfo = true
    await this._getStats()
  }

  private async _getUserInfo() {
    try {
      // 获取缓存中的用户信息
      let res = (await getStorage("userInfo")) as any
      this.userinfo = res.data
      console.log("获取用户信息", res)
    } catch (err) {
      console.error("获取用户失败")
    }
  }

  private async _getStats() {
    if (!this.showUserInfo) {
      return
    }
    try {
      let res = await getVoteStat()
      console.log("res:::", res)
      this.totalVoteNum = res.data.reduce((acc: any, cur: any) => {
        return acc?.voteCount || 0 + +cur?.voteCount
      }, 0)
      this.actNum = res.data.length
      console.log("获取统计数据", res)
    } catch (err) {
      console.error("获取统计数据失败", err)
    }
  }

  private async _getUserPhone() {
    try {
      // 获取缓存中的用户信息
      let res = (await getStorage("userPhone")) as any
      this.userphone = res.data
      console.log("获取用户手机信息", res)
    } catch (err) {
      console.error("获取用户手机信息")
    }
  }

  private async toHistory() {
    if (!this.showUserInfo) {
      return
    }
    uni.navigateTo({
      url: `../history/history`,
    })
  }
}
</script>

<style scoped></style>
