<template>
    <view class="flex flex-col items-center" data-agent="">
        <view class="content">
            <image
                :src="brandSrc"
                class="image"
                mode="widthFix"
                style="width: 750rpx;"
            />
            <image
                :src="faceSrc"
                class="image"
                mode="widthFix"
                style="width: 750rpx;"
            />
            <image
                :src="productSrc"
                class="image"
                mode="widthFix"
                style="width: 750rpx;"
            />
        </view>
    </view>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BrandShow extends Vue {
    private brandSrc = 'https://tp.huadongbio.com:9000/weixinapp-vote/brand.png'
    private faceSrc = 'https://tp.huadongbio.com:9000/weixinapp-vote/face.png'
    private productSrc =
        'https://tp.huadongbio.com:9000/weixinapp-vote/product.png'
}
</script>
