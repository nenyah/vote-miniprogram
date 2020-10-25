<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 14:59:31
-->
<script lang="ts">
import Vue from "vue"
import {mapActions} from "vuex"

export default Vue.extend({
    mpType: "app",
    onLaunch() {
        console.log("App Launch")
    },
    onShow() {
        console.log("App Show")
        this.initApp()
    },
    onHide() {
        console.log('App Hide')

    },
    globalData: {
    },
    methods:{
        ...mapActions(['initApp'])
    }
})
</script>

<style lang="scss">
@import 'assets/css/tailwind.css';
/*每个页面公共css */
.bg-theme-p-1 {
    background-color: #ffbdd5;
}

.bg-theme-p-2 {
    background-color: #f078a8;
}
.bg-theme-red {
    background-color: #cd005b;
}
.text-theme-red {
    color: #cd005b;
}
.text-theme-red-light {
    color: #f078a8;
}
.text-theme-gray {
    color: #595757;
}
</style>
