<template>
    <view class="text-gray-100 flex flex-col items-center w-full">
        <view class="flex w-4-5 px-2 text-theme-red-light text-center w-full">
            <view class="flex-1">排名</view>
            <view class="flex-1">编号</view>
            <view class="flex-1">参与选手</view>
            <view class="flex-1">票数</view>
        </view>

        <scroll-view
            class="flex flex-col items-center"
            enable-flex
            scroll-y="true"
            style="height:900rpx;width: 730rpx;"
            @scrolltolower="lower"
        >
            <block v-for="(item, index) in items" :key="item.id">
                <rank-item :index="index" :item="item" class="w-full"></rank-item>
            </block>
            <view v-if="items.length>10">
                <view v-if="hasMore" class="text-gray-900">下拉加载更多</view>
                <view v-else class="text-gray-900">--- 我也是有底线的 ---</view>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import voteItem from "@/components/vote-item/vote-item.vue"
import rankItem from "@/components/rank-item/rank-item.vue"

@Component({
    components: {
        rankItem,
    }
})
export default class RankList extends Vue {

    get hasMore() {
        return this.$store.state.item.hasMore
    }

    get items() {
        return this.$store.state.item.items
    }

    lower() {
        this.$store.dispatch("item/itemsByCate")
    }
}
</script>

<style scoped>

</style>