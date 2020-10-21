<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    mpType: 'app',
    onLaunch() {
        console.log('App Launch')
    },
    onShow() {
        console.log('App Show')
    },
    onHide() {
        console.log('App Hide')
    },
    globalData: {
        baseurl: 'huadongio.com',
        activities: [],
        currentActId: -1,
        items: [],
        currentItemId: -1,
        openid: '',
        token: '',
        unionid: '',
    },
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
// .bg-theme-p-3 {
//   background-color: #ec7db0;
// }

// .bg-theme-p-4 {
//   background-color: #83c7d2;
// }

// .bg-theme-p-5 {
//   background-color: #74c8d2;
// }
// .text-theme-1 {
//   color: #269ba6;
// }
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
