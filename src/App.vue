<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-18 14:36:30
-->
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  mpType: "app",
  onLaunch() {
    console.log("App Launch")
    // 判断是否登录
    // 1. 登录进入对应页面
    // 2. 没有登录进入登录授权页面
    uni.login({
      provider: "weixin",
      success: (loginRes) => {
        console.log("微信登录返回信息", loginRes)
      },
      fail: (err) => {
        console.error("微信登录错误信息", err)
        uni.redirectTo({
          url: "pages/login/login",
        })
      },
    })
  },
  onShow() {
    console.log("App Show")
  },
  onHide() {
    console.log("App Hide")
  },
  globalData: {
    baseurl: "huadongio.com",
    activities: [],
    currentActId: 0,
    items: [],
    currentItemId: 0,
  },
})
</script>

<style lang="scss">
@import "assets/css/tailwind.css";
/*每个页面公共css */
</style>
