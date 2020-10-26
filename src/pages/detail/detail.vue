<template>
    <view class="bg-theme-p-1 flex flex-col items-center">
        <!-- 标题 -->
        <title :content="activity.name"></title>
        <!-- 统计票数 -->
        <stats :content="item.stats" :isDetail="true">
            <view
                class="text-2xl text-gray-100 font-bold text-center mt-4 border border-solid border-gray-200 p-2 inline-flex bg-orange-500"
                @click="vote"
            >
                投票
            </view>
        </stats>
        <!-- 选手详情 -->
        <sub-title :content="title1"></sub-title>
        <!-- 选手图片 -->
        <view class="flex justify-center">
            <vote-item :item="item"></vote-item>
        </view>
        <!-- 作品展示 -->
        <sub-title
            v-if="item.works !== undefined"
            :content="title4"
        ></sub-title>
        <image v-if="item.works !== undefined" :src="item.works" mode="widthFix" style="width:700rpx;"></image>
        <!-- 风采展示 -->
        <sub-title v-if="item.play !== undefined" :content="title2"></sub-title>
        <detail-video v-if="item.play !== undefined" :src="item.play"></detail-video>

        <!-- 选手简介 -->
        <sub-title
            v-if="item.description !== undefined"
            :content="title3"
        ></sub-title>
        <view v-if="item.description" class="text-gray-100 p-4 text-center">{{
                item.description
            }}
        </view>
        <!-- 帮我拉票 -->
        <view class="text-center">
            <view
                class="inline-block text-gray-100 text-xl my-2 p-2 border-r-0 border-l-0 border-t-0 border-b-2 border-solid border-orange-500"
                @click="share"
            >
                帮我拉票
            </view>
        </view>

        <!-- 返回 -->
        <view class="text-center">
            <view
                class="inline-block text-gray-100 text-xl my-2 p-2 border-r-0 border-l-0 border-t-0 border-b-2 border-solid border-orange-500"
                @click="backToIndex"
            >
                返回
            </view>
        </view>
        <!-- 脚注 -->
        <vote-footer :content="activity.name"></vote-footer>
        <modal
            :src="canvasUrl"
            v-show="showModal"
            @hide="hide"
            :itemid="id"
        ></modal>
    </view>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
import title from "@/components/title/title.vue"
import stats from "@/components/stats/stats.vue"
import voteItem from "@/components/vote-item/vote-item.vue"
import voteFooter from "@/components/footer/footer.vue"
import subTitle from "@/components/sub-title/sub-title.vue"
import detailVideo from "@/components/detail-video/detail-video.vue"
import modal from "@/components/modal/modal.vue"

let app = getApp()

interface OnLoadParams {
    id?: number
    scene?: string
}

@Component({
    components: {
        title,
        stats,
        voteItem,
        voteFooter,
        subTitle,
        detailVideo,
        modal,
    },
})
export default class Detail extends Vue {
    [x: string]: any

    private id = -1
    private actId = 0
    private title1 = "选手详情"
    private title2 = "选手风采"
    private title3 = "选手简介"
    private title4 = "选手作品"

    get showModal() {
        return this.$store.state.item.showModal
    }

    get canvasUrl() {
        return this.$store.state.item.canvasUrl
    }

    get item() {
        return this.$store.state.item.item
    }

    get activity() {
        return this.$store.state.activity.activity
    }


    @Watch("item")
    itemChange(newVal: string, oldVal: string) {

    }

    backToIndex() {
        uni.redirectTo({
            url: `/pages/index/index?actId=${this.actId}`,
            success: (res) => {
                console.log("res:::", res)
            },
            fail: (err) => {
                console.error("err:::", err)
            },
        })
    }

    async onLoad(query: OnLoadParams) {
        const scene =
            query.scene !== undefined
                ? decodeURIComponent(query.scene)
                : "undefined"
        // 根据参数判断是其他页面跳转还是扫码进入
        if (scene == "undefined") {
            return
        }
        this.id = Number(scene.split("&")[0].split("=")[1])
        this.actId = Number(scene.split("&")[1].split("=")[1])
        uni.$on("updateDetail", async () => {
            this.$store.commit("activity/selectActivityByID", this.actId)
            await this.$store.dispatch("item/itemById", {id: this.id, activityId: this.actId})
            // 设置标题
            uni.setNavigationBarTitle({
                title: `我是${this.item.code}号，${this.item.name} 正在参加${this.activity.name}`,
            })
        })
    }


    onHide() {
        uni.$off("updateDetail", async () => {
            await this.$store.dispatch("activity/activityById", this.actId)
            await this.$store.dispatch("item/itemById", {id: this.id, activityId: this.actId})
            // 设置标题
            uni.setNavigationBarTitle({
                title: `我是${this.item.code}号，${this.item.name} 正在参加${this.activity.name}`,
            })
        })
    }

    async vote() {
        this.$store.dispatch("item/vote")
    }

    // 生成分享海报
    share() {
        this.$store.dispatch("item/share", {
            itemId: this.item.id,
        })
    }

    // An highlighted block
    // 这两个方法可以直接写在methods里面， 也可以写在和生命周期同级的地方
    // 分享到朋友圈
    onShareTimeline(res: any) {
        console.log("res:::", res)
        return {
            title: `我是${this.item.code}号，${this.item?.name} 正在参加${this.activity.name}`,
            query: `itemId=${this.item.id}&actId=${this.actId}`,
            imageUrl: this.canvasUrl,
        }
    }

    // 这两个方法都要写上，就算不分享给好友也要有这个方法，下面的showShareMenu配置要用到
    onShareAppMessage(res: any) {
        if (res.from === "button") {
            // 来自页面内转发按钮
            console.log(res.target)
            const query = encodeURI(`id=${this.id}&actId=${this.actId}`)
            return {
                title: `我是${this.item.code}号，${this.item?.name} 正在参加${this.activity.name}`,
                path: `/pages/detail/detail?scene=${query}`,
                imageUrl: this.canvasUrl,
            }
        }
    }
}
</script>

<style></style>
