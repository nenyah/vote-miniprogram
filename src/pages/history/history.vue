<template>
  <view class="bg-gray-300 h-full">
    <view class="p-2 text-gray-700 text-sm bg-gray-100">名称/时间</view>
    <view v-for="record in records" :key="record.id" class="flex bg-gray-100 mx-auto mt-1 mb-2 items-center p-2">
      <view
        class=" bg-blue-400 rounded-full w-28 h-28 p-2 border border-solid border-blue-400"
      >
        <view class="fa fa-heart text-red-500 text-3xl"></view>
      </view>
      <view class="mx-2 text-gray-600">
        <view class="text-lg text-gray-900">评选“伊婉最美明星脸”活动</view>
        <view class="text-xs">投给001号选手迪力热巴1票</view>
        <view class="text-xs">2020-09-24 15:23</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component({})
export default class history extends Vue {
    records: Array<any> = [
        {
            id:0,
            avarta:"",
            actName:"伊婉最美明星脸",
            code:"001",
            itemName:"迪力热巴",
            voteTime:"2020-09-24 15:23"
        },
        {
            id:1,
            avarta:"",
            actName:"伊婉最美明星脸",
            code:"002",
            itemName:"迪力热巴",
            voteTime:"2020-09-24 15:23"
        },
        {
            id:2,
            avarta:"",
            actName:"伊婉最美明星脸",
            code:"003",
            itemName:"迪力热巴",
            voteTime:"2020-09-24 15:23"
        },
        {
            id:3,
            avarta:"",
            actName:"伊婉最美明星脸",
            code:"004",
            itemName:"迪力热巴",
            voteTime:"2020-09-24 15:23"
        }
    ];
}
</script>

<style scoped></style>
