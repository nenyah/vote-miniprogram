<template>
  <view>小程序首页 </view>
</template>

<script lang="ts">
import Vue from "vue"
import {} from "@/mock/store"
export default Vue.extend({
  onLoad() {
    uni.authorize({
      scope: "scope.userInfo",
      success: () => {
        uni.login({
          provider: "weixin",
          success: (loginRes) => {
            console.log("loginRes", loginRes)
            // 获取用户信息
            uni.getUserInfo({
              provider: "weixin",
              lang: "zh_CN",
              success: (infoRes) => {
                console.log("用户信息为：", infoRes.userInfo)
              },
            })
          },
        })
      },
    })
  },
})
</script>

<style></style>
