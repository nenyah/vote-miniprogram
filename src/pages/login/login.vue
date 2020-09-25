<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-17 10:02:11
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-25 13:38:43
-->
<template>
  <view>
    <view class=" h-full flex flex-col items-center">
      <view
        class="w-32 h-32 rounded-full bg-red-500 text-gray-100 flex justify-center items-center text-lg mt-20"
        >婉美投票</view
      >
      <button
        v-if="!AuthorizedUserInfo"
        class="text-gray-100 bg-green-500 p-2 mt-5 w-10--12 rounded-full border-none border-0 border-gray-100"
        open-type="getUserInfo"
        @getuserinfo="getuserinfo"
      >
        授权使用微信头像、昵称
      </button>
      <button
        v-if="AuthorizedUserInfo && !AuthorizedPhone"
        class="text-gray-100 bg-green-500 p-2 mt-5 w-10--12 rounded-full border-none border-0 border-gray-100"
        open-type="getPhoneNumber"
        @getphonenumber="getphonenumber"
      >
        微信一键登录
      </button>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import { login, userInfo } from "@/servise/login"
import { IglobalData } from "@/common/interface"
import { getUserInfo } from "@/utils/utils"

let app = getApp()
export default Vue.extend({
  data() {
    return {
      AuthorizedUserInfo: false as boolean,
      AuthorizedPhone: false as boolean,
      page: "",
    }
  },
  onLoad(query: any) {
    console.log("传入参数", query)
    this.page = query.page
  },
  watch: {
    AuthorizedPhone(newValue, oldValue) {
      console.log(`newValue, oldValue`, newValue, oldValue)
      uni.reLaunch({
        url: `../${this.page}/${this.page}`,
        fail: (err) => {
          console.error("跳转失败", err)
        },
      })
    },
  },
  methods: {
    isFail(e: any) {
      return e.detail.errMsg.includes("fail")
    },
    showFailMsg() {
      uni.showToast({
        title: "为了更好的为你服务，请同意授权",
        icon: "none",
      })
    },
    async getphonenumber(e: any) {
      console.log("获取手机触发", e.detail)
      if (this.isFail(e)) {
        console.log("获取授权失败")
        this.showFailMsg()
        return
      }
      this.AuthorizedPhone = true
    },
    async getuserinfo(e: any) {
      console.log("获取用户信息触发", e.detail)
      if (this.isFail(e)) {
        console.log("获取授权失败")
        this.showFailMsg()
        return
      }
      this.AuthorizedUserInfo = true
    },
  },
})
</script>

<style scoped></style>
