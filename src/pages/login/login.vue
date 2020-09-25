<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-17 10:02:11
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-25 12:46:50
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
    }
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
    },
    async getuserinfo(e: any) {
      console.log("获取用户信息触发", e.detail)
      if (this.isFail(e)) {
        console.log("获取授权失败")
        this.showFailMsg()
        return
      }
      this.AuthorizedUserInfo = true
      // try {
      //   let res = await getUserInfo()
      //   console.log("获取授权信息", res)
      //   this.AuthorizedUserInfo = true
      // } catch (err) {
      //   console.error("获取授权失败", err)
      // }

      //  成功后，获取userinfo
      // uni.getUserInfo({
      //   provider: "weixin",
      //   success: async (res) => {
      //     let userInfoData = res.userInfo
      //     //判断是否授权
      //     uni.getSetting({
      //       success: async (res) => {
      //         if (!res.authSetting["scope.userInfo"]) {
      //           //这里调用授权
      //           console.log("当前未授权")
      //           uni.authorize({
      //             scope: "scope.userInfo",
      //             success: async (res) => {
      //               console.log("授权成功", res)
      //             },
      //             fail: (err) => {
      //               console.error("授权失败", err)
      //               uni.showToast({
      //                 title: "为了更好的为你服务，请同意授权",
      //                 icon: "none",
      //               })
      //             },
      //           })
      //         } else {
      //           //用户已经授权过了
      //           console.log("当前已授权")
      //           // 弹出正在登录的弹框
      //           uni.showLoading({
      //             mask: true,
      //             title: "正在登录···",
      //             complete: () => {},
      //           })
      //           // 获取成功存入缓存
      //           uni.setStorage({
      //             key: "userInfo",
      //             data: userInfoData,
      //           })
      //           try {
      //             // 上传用户信息
      //             await userInfo({
      //               openId: app.globalData?.openId,
      //               signature: res.signature,
      //               encryptedData: res.encryptedData,
      //               iv: res.iv,
      //             })
      //           } catch (error) {
      //             console.error("上传用户信息失败", error)
      //           }

      //           // 成功后，跳转到活动列表页
      //           uni.reLaunch({
      //             url: "../index/index",
      //             success: (res) => {
      //               console.log("跳转成功", res)
      //             },
      //             fail: (err) => {
      //               console.log("跳转失败", err)
      //             },
      //           })
      //         }
      //       },
      //       fail: function(res) {},
      //     })
      //   },
      //   fail: (err) => {
      //     console.error("获取用户信息失败", err)
      //   },
      // })
    },
  },
})
</script>

<style scoped></style>
