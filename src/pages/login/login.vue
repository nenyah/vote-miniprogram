<!--
 * @Description: 授权页
 * @Author: Steven
 * @Date: 2020-09-17 10:02:11
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-22 09:14:52
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

export default Vue.extend({
  methods: {
    getuserinfo() {
      uni.authorize({
        scope: "scope.userInfo",
        success: (res) => {
          console.log("授权成功", res)
          //  成功后，获取userinfo
          uni.getUserInfo({
            provider: "weixin",
            success: (res) => {
              console.log("成功获取用户信息", res)
              uni.setStorage({
                key: "userInfo",
                data: res,
              })
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
        fail: (err) => {
          console.error("授权失败", err)
        },
      })
    },
  },
})
</script>

<style scoped></style>
