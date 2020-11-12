<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:24:10
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-27 14:29:44
-->
<template>
    <view class="text-gray-100 bg-gray-100 flex-none flex flex-col items-center w-full" v-if="items.length>0">
        <scroll-view
            class="flex flex-wrap justify-start box-border p-1 mt-2 rounded listsize"
            scroll-y="true"
            @scrolltolower="lower"
            enable-flex
        >
            <vote-item
                :item="item"
                :index="true"
                :col="2"
                v-for="item in items"
                :key="item.id"
            ></vote-item>

        </scroll-view>
        <view v-if="!searching&&items.length>10" class="self-center mx-auto my-2">
            <view v-if="hasMore" class="text-gray-900">下拉加载更多</view>
            <view v-else class="text-gray-900">--- 我也是有底线的 ---</view>
        </view>
    </view>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import voteItem from "@/components/vote-item/vote-item.vue"

@Component({
    components: {
        voteItem,
    },
})
export default class VoteList extends Vue {
    [x: string]: any

    get hasMore() {
        return this.$store.state.item.hasMore
    }

    get items() {
        return this.$store.state.item.items
    }

    get searching() {
        return this.$store.state.item.searching
    }

    lower() {
        this.$store.dispatch("item/itemsByCate")
    }
}
</script>

<style lang="scss" scoped>
.listsize {
    width: 730 rpx;
    height: 90vh;
}
</style>
