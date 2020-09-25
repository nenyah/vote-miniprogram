<template>
  <view class="bg-gray-300">
    <view class="p-2 text-gray-700 text-sm bg-gray-100">名称/时间</view>
    <view
      v-for="record in records"
      :key="record.id"
      class="flex bg-gray-100 mx-auto mt-1 mb-2 items-center p-2"
    >
      <image
        :src="record.img"
        class="w-12 h-12 rounded-full border border-solid border-gray-500"
        mode="top"
      ></image>
      <view class="mx-2 text-gray-600">
        <view class="text-lg text-gray-900"
          >评选“{{ record.activityName }}”活动</view
        >
        <view class="text-xs"
          >投给{{ record.code }}号选手{{ record.name }}1票</view
        >
        <view class="text-xs">{{ formatTime(record.voteTime) }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { getVoteHistory } from "@/servise/vote"
import Vue from "vue"
import Component from "vue-class-component"
import * as _ from "lodash"
@Component({})
export default class history extends Vue {
  records: Array<any> = []
  onLoad() {
    this._getHistory()
  }
  private async _getHistory() {
    let res = await getVoteHistory({ pageNo: 1 })
    let records = res.data.data.map((el: any) => {
      return el.records
    })
    this.records = _.flatten(records)
    console.log("获取历史信息", _.flatten(records))
  }
  get formatTime() {
    return (param: string) => {
      return param.substr(0, 16).replace("T", " ")
    }
  }
}
</script>

<style scoped></style>
