
<template>
  <view>
    <view class="flex flex-col items-center">
      <view class="p-1 w-56 text-center text-gray-100 m-2 rounded-full bg-theme-p-2">
        <view class="border border-solid border-white rounded-full py-1">全国十强</view>
      </view>
      <view class="flex flex-wrap items-center justify-center bg-gray-100 rounded ">
        <view v-for="(item,idx) in top10" :key="item.id" class="flex w-full m-1"
              style="width: 350rpx;">
          <navigator :url="`/pages/detail/detail?id=${item.id}`" class="p-1 my-1 rounded-lg shadow bg-theme-p-1"
                     style="width: 350rpx;">
            <view class="superscript">
              <view class="gradual">{{ idx + 1 }}</view>
            </view>
            <image :src="item.img" class="w-40 h-40"
                   style="border-color: #2f855a"></image>
            <view class="ml-1 flex-grow text-xs">
              <view class="text-gray-100">{{ item.stats[0].value }} 票</view>
              <view class=" font-bold text-theme-red">{{ item.company }}</view>
              <view class=" text-theme-red">{{ item.name }}</view>
            </view>
          </navigator>
        </view>
      </view>

    </view>
<!--    <view class="flex flex-col items-center">-->
<!--      <view class="p-1 w-56 text-center text-gray-100 m-2 rounded-full" style="background-color:#eccb9f">-->
<!--        <view class="border border-solid border-white rounded-full py-1">区域三强</view>-->
<!--      </view>-->
<!--      <view v-for="(cateItem,index) in top3" :key="index" class="flex flex-col items-center">-->
<!--        <view class="p-1 w-48 text-center text-gray-100 m-2 rounded-full" style="background-color:#eccb9f;">-->
<!--          <view class="border border-solid border-white rounded-full py-1">{{ cateItem.categoryName }}</view>-->
<!--        </view>-->
<!--        <view v-for="item in cateItem.data" :key="item.id" class="bg-gray-100 p-1 rounded">-->
<!--          <navigator :url="`/pages/detail/detail?id=${item.id}`" class="p-2 my-2 rounded-lg shadow flex items-center"-->
<!--                     style="background-color:#eccb9f; width: 650rpx;">-->
<!--            <image :src="item.img" class="w-16 h-16 rounded-full border border-solid"-->
<!--                   style="border-color: #2f855a"></image>-->
<!--            <view class="ml-2 flex-grow">-->
<!--              <view class="font-bold" style="color: #d0a36a">{{ item.company }}</view>-->
<!--              <view class="flex justify-between">-->
<!--                <view class="" style="color: #d0a36a">{{ item.name }}</view>-->
<!--                <view class="text-right text-gray-100">{{ item.stats[0].value }} 票</view>-->
<!--              </view>-->
<!--            </view>-->
<!--          </navigator>-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->
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

<style lang="scss" scoped>
.superscript {
  position: relative;
  top: -6px;
  left: -6px;
  width: 30px;
  height: 30px;
  overflow: hidden;
  text-align: center;
  color: white;
  /* 使用背景色渐变 */
  .gradual {
    width: 100%;
    height: 100%;
    border-top-left-radius: 5px;
    background: linear-gradient(135deg, #cd005b 50%, transparent 50%);
  }
}


</style>
