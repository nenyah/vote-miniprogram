<template>
    <view class="bg-theme-p-1">
        <view class="p-2 text-theme-red text-sm bg-gray-100">名称/时间</view>
        <view
            v-for="record in records"
            :key="record.id"
            class="flex bg-gray-100 mx-auto mt-1 mb-2 items-center p-2"
        >
            <image
                :src="record.img"
                class="w-16 h-16 rounded-full border border-solid border-gray-500"
                mode="fitFill"
            ></image>
            <view class="mx-2 text-theme-gray">
                <view class="text-lg text-theme-red"
                >评选“{{ record.activityName }}”活动
                </view>
                <view class="text-xs"
                >投给{{ record.code }}号选手{{ record.name }}1票
                </view>
                <view class="text-xs">{{ record.voteTime | formatTime }}</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import {getVoteHistory} from "@/servise/vote"
import {Record} from "@/common/interface"
import Vue from "vue"
import Component from "vue-class-component"
import flatten from "lodash/flatten"

@Component({})
export default class History extends Vue {
    private records: Record[] = []
    private hasMore = true
    private pageNo = 1

    onLoad() {
        this._getHistory()
    }

    private async _getHistory() {
        try {
            let res = await getVoteHistory({pageNo: 1})
            let records = res.data.map((el) => {
                return el.records
            })
            this.records = flatten(records)
            console.log("获取历史信息", flatten(records))
        } catch (e) {
            console.log("获取历史记录错误", e)
            uni.showToast({
                title: `获取历史记录错误`,
                icon: "none"
            })
        }

    }

    // todo 下拉刷新
}
</script>

<style scoped></style>
