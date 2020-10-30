<template>
    <view class="bg-theme-p-1 min-h-full pt-2 px-2">
        <title :content="activity.name"></title>
        <view class="text-gray-100">
            <uni-segmented-control
                :current="current"
                :values="cateItem"
                active-color="#cd005b"
                style-type="text"
                @clickItem="onClickItem"
            ></uni-segmented-control>
        </view>
        <rank-list
            :items="sortItems"
            :pageType="pageType"
            @tolower="tolower"
        ></rank-list>
        <vote-footer :content="activity.name"></vote-footer>
        <vote-tabbar :activeIndex="activeIndex"></vote-tabbar>
    </view>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import title from "@/components/title/title.vue"
import voteFooter from "@/components/footer/footer.vue"
import voteTabbar from "@/components/vote-tabbar/vote-tabbar.vue"
import rankList from "@/components/rank-list/rank-list.vue"
import {CategoryResponse} from "@/common/interface"

interface Query {
    id: number
}

@Component({
    components: {
        title,
        rankList,
        voteFooter,
        voteTabbar,
    }
})
export default class Desc extends Vue {
    [x: string]: any
    private activeIndex = 2

    get activity() {
        return this.$store.state.activity.activity
    }

    get cateItem() {
        return this.$store.state.category.categories.map((el: CategoryResponse) => el.name)
    }

    onLoad() {
        this.$store.dispatch("item/itemsByCate")
    }

    onUnload() {
        this.$store.commit("category/selectCateByIndex", 0)
        this.$store.commit("item/initItems")
    }

    onClickItem(e: any) {
        this.$store.commit("item/initItems")
        this.$store.commit("category/selectCateByIndex", e.currentIndex)
        this.$store.dispatch("item/itemsByCate")
    }
}
</script>

<style></style>
