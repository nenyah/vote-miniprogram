<template>
    <view>
        <view
            v-if="index"
            class="flex flex-col flex-1 text-center justify-center border border-solid border-gray-600 bg-theme-gradient m-1 p-1"
            :style="customWidth"
        >
            <view class="text-theme-red my-1">{{ item.code }} 号</view>
            <view>
                <view @click="toUrl">
                    <image
                        :src="item.img"
                        mode="scaleToFill"
                        class="w-32 h-32"
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
                <view class="flex w-full">
                    <view class="flex-1 bg-theme-p-2 text-white p-2"
                    >{{ item.stats[0].value }}
                    </view>
                    <view
                        class="flex-1 bg-theme-red text-white p-2"
                        @click="vote(item.id)"
                    >
                        投票
                    </view>
                </view>
                <view class="my-1 p-2" @click="share">帮我拉票</view>
            </view>
        </view>
        <view
            v-else
            class="flex flex-col flex-1 text-center justify-center border border-solid border-gray-600 bg-theme-gradient m-1 p-1"
            :style="customWidth"
        >
            <view class="text-theme-red my-1">{{ item.code }} 号</view>
            <image
                :src="item.img"
                mode="widthFix"
                class="w-40 h-40"
                style="background-color: #eeeeee;"
            ></image>

            <view class="text-gray-100 text-lg font-bold mt-1">{{
                    item.name
                }}
            </view>
            <view class="text-theme-red my-1">{{ item.category.name }}</view>
            <view class="text-theme-red my-1">{{ item.company }}</view>
        </view>
    </view>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {Iitem} from "@/common/Item"

@Component
export default class VoteItem extends Vue {
    [x: string]: any

    @Prop() item!: Iitem
    private mark = false
    @Prop() private index!: boolean
    @Prop() private col = 1

    get customWidth() {
        return `width:320rpx;`
    }

    toUrl() {
        this.$store.commit("item/setItem", this.item)
        uni.navigateTo({
            url: `/pages/detail/detail?id=${this.item.id}`
        })
    }

    async share() {
        console.log("share:::")
        await this.$store.dispatch("item/share", {
            itemId: this.item.id,
        })
    }

    vote(itemId: number) {
        this.$store.dispatch("item/vote", {itemId})
    }
}
</script>

<style lang="scss" scoped>
.border-img {
    position: relative;
}

.border-img::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 10px;
    background: $input-bg1-base64-code;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 10;
}

.border-img::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    background: $input-bg2-base64-code;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 10;
}

.bg-theme-gradient {
    background: linear-gradient(to bottom right, #ffcfe0, #ff78a9);
}
</style>
