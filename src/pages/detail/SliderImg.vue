<template>
    <swiper class="swiper"
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
            v-if="item.works.length>0"
    >
        <swiper-item v-for="(img,index) in item.works" :key="index">
            <image
                :src="img"
                mode="widthFix"
                style="width:700rpx;"
            ></image>
        </swiper-item>

    </swiper>
</template>
<script lang="ts">
export default {
    name: "SliderImg",
    props: {
        autoplay: {},
        duration: {},
        indicatorDots: {},
        interval: {},
        item: {},
        swiper: {}
    }
}
</script>