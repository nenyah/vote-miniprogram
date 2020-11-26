<template>
    <view class="bg-gray-200 h-full">
        <view class="bg-theme-p-1 w-full h-40"></view>
        <view
            class="w-10--12 mx-auto -mt-32 rounded bg-gray-100 border border-gray-100 border-solid shadow"
        >
            <view
                class="flex border-gray-300 border-solid border border-t-0 border-r-0 border-l-0 p-4"
            >
                <view v-if="showUserInfo" class="flex items-center">
                    <image
                        :src="userinfo.avatarUrl"
                        class="rounded-full w-16 h-16 border border-gray-300 border-solid"
                    ></image>
                    <view class="mx-5">
                        <view class="text-gray-900 font-bold">{{
                                userinfo.nickName
                            }}
                        </view>
                        <view>{{ userinfo.mobile | encMsg }}</view>
                    </view>
                </view>
                <view v-else class="mx-auto">
                    <navigator
                        class=" bg-theme-p-2 text-gray-100 py-2 px-6 rounded-full"
                        url="../login/login"
                    >登录/注册
                    </navigator>
                </view>
            </view>
            <view class="flex p-2">
                <view
                    class="flex-1 text-center border-l-0 border-t-0 border-b-0 border-gray-300 border-solid border-r"
                >
                    <view>{{ actNum }}</view>
                    <view>参与活动</view>
                </view>
                <view class="flex-1 text-center">
                    <view>{{ totalVoteNum }}</view>
                    <view>总投票数</view>
                </view>
            </view>
        </view>
        <view class=" w-10--12 mx-auto my-3 bg-gray-100 shadow p-2 box-border">
            <view class="flex justify-between items-center" @tap="toHistory">
                <view class="flex items-center">
                    <view class="fa fa-bookmark text-gray-500"></view>
                    <view class="mx-2">查看历史投票记录</view>
                </view>
                <view
                    class="fa fa-angle-right text-gray-500 text-lg font-bold"
                ></view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
import {getVoteStat} from "@/servise/vote"
import sumBy from "lodash/sumBy"

@Component({
    filters: {
        encMsg: (msg: string) => {
            return msg.substring(0, 3) + "****" + msg.substring(7)
        },
    },
})
export default class Profile extends Vue {
    [x: string]: any
    actNum: number = 0
    totalVoteNum: number = 0

    get showUserInfo() {
        return this.$store.state.isLogin
    }

    get userinfo() {
        return this.$store.state.user.info
    }

    async onShow() {
        await this._getStats()
    }


    private async _getStats() {
        if (!this.showUserInfo) {
            return
        }
        try {
            let res = await getVoteStat()
            this.totalVoteNum = sumBy(res, "voteCount")
            this.actNum = res.length
        } catch (err) {
            console.error("获取统计数据失败", err)
        }
    }


    private async toHistory() {
        if (!this.showUserInfo) {
            return
        }
        uni.navigateTo({
            url: `../history/history`,
        })
    }
}
</script>

<style scoped></style>
