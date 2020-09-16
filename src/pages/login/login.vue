<template>
  <view>
    婉美投票
    <button class="" open-type="getUserInfo" @getuserinfo="getuserinfo">
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
        scope: "scope.userinfo",
        success: res => {
          console.log("授权成功", res)
        }
      })
    }
  },
})
</script>

<style scoped></style>
