<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-10-10 15:14:47
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 16:08:54
-->
<template>
    <view>
        <view
            v-for="activity in activities"
            :key="activity.id"
            class="my-4 px-2 text-center text-gray-500 rounded-lg shadow-lg"
        >
            <view
                @click="goIndex(activity.id)"
            >
                <swiper
                    v-for="(img, index) in activity.bannerImg"
                    :key="index"
                    :autoplay="autoplay"
                    :duration="duration"
                    :indicator-dots="indicatorDots"
                    :interval="interval"
                    class="w-full h-56"
                >
                    <swiper-item>
                        <image
                            :src="img"
                            class="rounded rounded-b-none w-full h-64"
                            mode="widthFix"
                        ></image>
                    </swiper-item>
                </swiper>
                <view class="p-2 text-left">
                    <view class="text-theme-red">{{ activity.name }}</view>
                    <view class="flex items-center">
                        <view
                            class="fa fa-group mr-1 text-theme-red text-center"
                        ></view>
                        <view
                        >{{ activity.stats[1].value }}人参与，已投票：
                        </view
                        >
                        <view>{{ activity.stats[2].value }}</view>
                    </view>
                    <view class="flex items-center">
                        <view
                            class="fa fa-clock-o mr-1 text-theme-red text-center"
                        ></view>
                        <view> {{ activity.endTime | formatTime }} 结束</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

@Component({})
export default class Home extends Vue {
    [x: string]: any

    private autoplay = false
    private interval = 300
    private indicatorDots = false
    private duration = 300

    get activities() {
        return this.$store.state.activity.activities
    }

    goIndex(id: number) {
        console.log("id:::", id)
        this.$store.commit("activity/selectActivityByID", id)
        this.$store.commit("activity/setCurrentActIdx", id)
        uni.navigateTo({
            url: `/pages/index/index?actId=${id}`
        })
    }

}
</script>

<style scoped></style>
