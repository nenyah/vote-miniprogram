<template>
    <view
        class="flex flex-col flex-1 text-center items-center border border-solid border-gray-600 bg-theme-gradient m-1 p-1"
    >
        <view class="text-theme-red my-1">{{ item.code }} 号</view>
        <image
            :src="item.img"
            mode="scaleToFill"
            class="w-64 h-64"
            style="background-color: #eeeeee;"
        ></image>
        <view class="text-gray-100 text-lg font-bold mt-1">{{
            item.name
            }}
        </view>
        <view class="text-theme-red my-1">{{
            item.category.name
            }}
        </view>
        <view class="text-theme-red my-1">{{ item.company }}</view>
    </view>
</template>
<script lang="ts">
export default {
    name: "DetailItem",
    props: {
        item: {}
    }
}
</script>
