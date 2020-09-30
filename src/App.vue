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
    selectedItems: [] as Array<any>,
  },
})
</script>

<style lang="scss">
@import "assets/css/tailwind.css";
/*每个页面公共css */
</style>
