<!--
 * @Description: 授权页
 * @Author: Steven
 * @Date: 2020-09-17 10:02:11
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-22 15:58:01
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
import { Iactivity, IglobalData } from "@/common/interface"

let app = getApp()
export default Vue.extend({
  methods: {
    getuserinfo() {
      uni.authorize({
        scope: "scope.userInfo",
        success: async (res) => {
          console.log("授权成功", res)
          uni.login({
            provider: "weixin",
            success: async (loginRes) => {
              console.log("微信登录返回信息", loginRes)
              // 获取openid
              let { data } = await login({ code: loginRes.code })
              console.log("远程登录返回信息", data)
              // 存入全局
              let globaldata = app.globalData as IglobalData
              globaldata.openid = data.openId

              //  成功后，获取userinfo
              uni.getUserInfo({
                provider: "weixin",
                success: async (res) => {
                  console.log("成功获取用户信息", res)
                  // 获取成功存入缓存
                  uni.setStorage({
                    key: "userInfo",
                    data: res.userInfo,
                  })
                  try {
                    // 上传用户信息
                    await userInfo({
                      openId: data.openId,
                      signature: res.signature,
                      encryptedData: res.encryptedData,
                      iv: res.iv,
                    })
                  } catch (error) {
                    console.error("上传用户信息失败", error)
                  }

                  // 成功后，跳转到活动列表页
                  uni.reLaunch({
                    url: "../home/home",
                    success: (res) => {
                      console.log("跳转成功", res)
                    },
                    fail: (err) => {
                      console.log("跳转失败", err)
                    },
                  })
                },
                fail: (err) => {
                  console.error("获取用户信息失败", err)
                },
              })
            },
          })
        },
        fail: (err) => {
          console.error("授权失败", err)
        },
      })
    },
  },
})
</script>

<style scoped></style>
