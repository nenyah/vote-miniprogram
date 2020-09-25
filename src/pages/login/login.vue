<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-17 10:02:11
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-25 11:03:42
-->
<template>
  <view class="flex flex-col justify-center items-center content-center h-full">
    婉美投票
    <button
      class="text-gray-100 bg-green-500 p-2 mt-5 w-4--5 rounded-full border-none border-0"
      open-type="getUserInfo"
      @getuserinfo="getuserinfo"
    >
      授权使用微信头像、昵称
    </button>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import { login, userInfo } from "@/servise/login"
import { IglobalData } from "@/common/interface"

let app = getApp()
export default Vue.extend({
  methods: {
    getuserinfo() {
      //  成功后，获取userinfo
      uni.getUserInfo({
        provider: "weixin",
        success: async (res) => {
          let userInfoData = res.userInfo
          //判断是否授权
          uni.getSetting({
            success: async (res) => {
              if (!res.authSetting["scope.userInfo"]) {
                //这里调用授权
                console.log("当前未授权")
                uni.authorize({
                  scope: "scope.userInfo",
                  success: async (res) => {
                    console.log("授权成功", res)
                  },
                  fail: (err) => {
                    console.error("授权失败", err)
                    uni.showToast({
                      title: "为了更好的为你服务，请同意授权",
                      icon: "none",
                    })
                  },
                })
              } else {
                //用户已经授权过了
                console.log("当前已授权")
                // 弹出正在登录的弹框
                uni.showLoading({
                  mask: true,
                  title: "正在登录···",
                  complete: () => {},
                })
                // 获取成功存入缓存
                uni.setStorage({
                  key: "userInfo",
                  data: userInfoData,
                })
                try {
                  // 上传用户信息
                  await userInfo({
                    openId: app.globalData?.openId,
                    signature: res.signature,
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                  })
                } catch (error) {
                  console.error("上传用户信息失败", error)
                }

                // 成功后，跳转到活动列表页
                uni.reLaunch({
                  url: "../index/index",
                  success: (res) => {
                    console.log("跳转成功", res)
                  },
                  fail: (err) => {
                    console.log("跳转失败", err)
                  },
                })
              }
            },
            fail: function(res) {},
          })
        },
        fail: (err) => {
          console.error("获取用户信息失败", err)
        },
      })
    },
  },
})
</script>

<style scoped></style>
