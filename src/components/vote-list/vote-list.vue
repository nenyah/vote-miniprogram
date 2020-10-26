<template>
    <view class="text-gray-100 flex flex-col items-center w-full">
        <scroll-view
            class="flex flex-wrap justify-around box-border p-1 mt-2 bg-gray-100  rounded"
            style="width: 730rpx; height:100vh;"
            scroll-y="true"
            @scrolltolower="lower"
            enable-flex
        >
            <block v-for="item in items" :key="item.id">
                <vote-item
                    :item="item"
                    :index="true"
                    :col="2"
                    @plusVote="handlePlusVote"
                ></vote-item>
            </block>
            <!--      todo 修改文字在一行-->
            <view v-if="!searching">
                <view v-if="hasMore" class="text-gray-900">下拉加载更多</view>
                <view v-else class="text-gray-900">--- 我也是有底线的 ---</view>
            </view>
        </scroll-view>

    </view>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import voteItem from "@/components/vote-item/vote-item.vue"


@Component({
    components: {
        voteItem,
    }
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
        console.log("search:::", this.$store.state.item.searching)
        return this.$store.state.item.searching
    }

    lower() {
        this.$store.dispatch("item/itemsByCate")
    }
}
</script>

