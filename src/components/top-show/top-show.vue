<template>
  <view>
    <view class="flex flex-col items-center">
      <view class="p-1 w-56 text-center text-gray-100 m-2 rounded-full" style="background-color:#76c3cd;">
        <view class="border border-solid border-white rounded-full py-1">全国十强</view>
      </view>
      <view v-for="item in top10" :key="item.id">
        <view class="p-2 my-2 rounded-lg shadow flex items-center" style="background-color:#77c7cf; width: 650rpx;">
          <image :src="item.img" class="w-16 h-16 rounded-full border border-solid"
                 style="border-color: #2f855a"></image>
          <view class="ml-2 flex-grow">
            <view class="text-theme-1 font-bold">{{ item.company }}</view>
            <view class="flex justify-between">
              <view class="text-theme-1">{{ item.name }}</view>
              <view class="text-right text-gray-100">{{ item.stats[0].value }} 票</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="flex flex-col items-center">
      <view class="p-1 w-56 text-center text-gray-100 m-2 rounded-full" style="background-color:#76c3cd;">
        <view class="border border-solid border-white rounded-full py-1">区域三强</view>
      </view>
      <view v-for="(cateItem,index) in top3" :key="index" class="flex flex-col items-center">
        <view class="p-1 w-48 text-center text-gray-100 m-2 rounded-full" style="background-color:#76c3cd;">
          <view class="border border-solid border-white rounded-full py-1">{{ cateItem.categoryName }}</view>
        </view>
        <view v-for="item in cateItem.data" :key="item.id">
          <view class="p-2 my-2 rounded-lg shadow flex items-center" style="background-color:#77c7cf; width: 650rpx;">
            <image :src="item.img" class="w-16 h-16 rounded-full border border-solid"
                   style="border-color: #2f855a"></image>
            <view class="ml-2 flex-grow">
              <view class="text-theme-1 font-bold">{{ item.company }}</view>
              <view class="flex justify-between">
                <view class="text-theme-1">{{ item.name }}</view>
                <view class="text-right text-gray-100">{{ item.stats[0].value }} 票</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component({})
export default class TopShow extends Vue {
  @Prop() private top10!: any[]
  @Prop() private top3!: any[]
}
</script>

<style scoped></style>
