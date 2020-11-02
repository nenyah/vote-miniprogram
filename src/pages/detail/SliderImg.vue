<template>
    <swiper class="swiper flex justify-center"
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
            v-if="item.works.length>0"
    >
        <swiper-item
            v-for="(img,index) in item.works"
            :key="index"
        >
            <image
                :src="img"
                mode="aspectFit"
                style="width:750rpx;"
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
<style lang="scss" scoped>
.swiper {
    width: 750rpx;
    height: 500rpx;
}
</style>