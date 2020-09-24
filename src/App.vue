<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-24 16:55:05
-->
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  mpType: "app",
  onLaunch() {
    console.log("App Launch")
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
    currentActId: -1,
    items: [],
    currentItemId: -1,
    openid: "",
    token: "",
    unionid: "",
  },
})
</script>

<style lang="scss">
@import "assets/css/tailwind.css";
/*每个页面公共css */
</style>
