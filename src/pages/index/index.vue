<template>
    <view class="bg-theme-p-1">
        <view class="pb-10  flex flex-col items-center">
            <!-- 品牌介绍-->
            <top-show></top-show>
            <!-- 广告轮播图 -->
            <banner :src="activity.bannerImg"></banner>
            <!-- 主题名称 -->
            <title :content="activity.name"></title>
            <!-- 统计区域 -->
            <stats :content="activity.stats">
                <view
                    class="mt-2 p-2 text-gray-100 text-center diff-time-box flex justify-center"
                >
                    <view v-if="!(activity.status === 'ENDED')">
                        {{ msg }}
                        <uni-countdown
                            :day="countdownTime.day"
                            :hour="countdownTime.hour"
                            :minute="countdownTime.min"
                            :second="countdownTime.sec"
                            :showDay="countdownTime.showDay"
                            background-color=""
                            color="#fff"
                            splitorColor="#fff"
                        ></uni-countdown>
                    </view>
                    <view v-else>{{ msg }}</view>
                </view>
            </stats>
            <!-- 规则区域 -->
            <view class="pt-4 my-2 bg-gray-100 w-11--12 rounded">
                <!-- 活动规则 -->
                <vote-rule :activity="activity"></vote-rule>
                <!-- 活动详情 -->
                <view class="text-theme-red flex px-4">
                    <view class="attr">
                        <view class="fa fa-clock-o text-theme-red mr-2"></view>
                        活动详情：
                    </view>
                    <view class="flex" @click="display = !display">
                        {{ display ? '收起' : '展开' }}
                        <view class="text-theme-red ml-2">></view>
                    </view>
                </view>
                <!-- 详情描述 -->
                <view v-if="display">
                    <view
                        v-for="(msg, idx) in desc"
                        :key="idx"
                        class="my-3 text-gray-600 px-4"
                    >
                        {{ msg }}
                    </view>
                </view>
            </view>
            <!-- 搜索区域 -->
            <search-bar></search-bar>
            <!-- 分组 -->
            <view class="text-gray-100 w-full">
                <uni-segmented-control
                    :current="current"
                    :values="cateItem"
                    active-color="#cd005b"
                    style-type="text"
                    @clickItem="onClickItem"
                ></uni-segmented-control>
            </view>
            <!-- 项目列表区域 -->
            <vote-list></vote-list>
            <vote-footer :content="activity.name"></vote-footer>
            <!-- uni-app未封装，但可直接使用微信原生的official-account组件-->
            <!-- #ifdef MP-WEIXIN -->
            <view class="bg-gray-100 w-full">
                <official-account></official-account>
            </view>
            <!-- #endif -->
        </view>
        <!-- 脚注区域 -->
        <vote-tabbar :activeIndex="activeIndex"></vote-tabbar>
        <modal v-show="showModal" :src="canvasUrl" @hide="hide"></modal>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import banner from '@/components/banner/banner.vue'
import title from '@/components/title/title.vue'
import stats from '@/components/stats/stats.vue'
import voteRule from '@/components/vote-rule/vote-rule.vue'
import searchBar from '@/components/search-bar/search-bar.vue'
import voteList from '@/components/vote-list/vote-list.vue'
import voteFooter from '@/components/footer/footer.vue'
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
import topShow from '@/components/top-show/top-show.vue'
import voteTabbar from '@/components/vote-tabbar/vote-tabbar.vue'
import modal from '@/components/modal/modal.vue'
import { CategoryResponse } from '@/common/interface'
import moment from 'moment'

@Component({
    components: {
        banner,
        title,
        stats,
        voteRule,
        searchBar,
        voteList,
        voteFooter,
        uniCountdown,
        uniSegmentedControl,
        topShow,
        voteTabbar,
        modal,
    },
})
export default class Index extends Vue {
    [x: string]: any

    private msg = '活动已经结束'
    private display = false
    private current = 0
    private activeIndex = 0

    get showModal() {
        return this.$store.state.item.showModal
    }

    get canvasUrl() {
        return this.$store.state.item.canvasUrl
    }

    get desc() {
        return this.activity?.description?.split('\n')
    }

    get activity() {
        return this.$store.state.activity.activity
    }

    get countdownTime() {
        let { startTime, endTime, status } = this.$store.state.activity.activity
        //  获取当前时间
        let now = moment()
        startTime = moment(startTime)
        endTime = moment(endTime)
        let duration = moment.duration(startTime.diff(now))

        // 根据状态显示不同内容
        if (status === 'ISCOMING') {
            this.msg = '活动开始还有'
        } else if (status === 'ONGOING') {
            this.msg = '活动结束还有'
            duration = moment.duration(endTime.diff(now))
        }
        const time = {
            showDay: false,
            day: duration.days(),
            hour: duration.hours(),
            min: duration.minutes(),
            sec: duration.seconds(),
        }
        if (duration.days() > 0) {
            time['showDay'] = true
        }
        return time
    }

    get cateItem() {
        return this.$store.state.category.categories.map(
            (el: CategoryResponse) => el.name
        )
    }

    get items() {
        return this.$store.state.item.items
    }

    async onLoad(query: { actId: number }) {
        console.log('actId:::', query.actId)
        await this.$store.dispatch('category/getCategories')
        await this.$store.dispatch('item/itemsByCate')
        // 设置标题
        uni.setNavigationBarTitle({
            title: this.$store.state.activity.activity.name,
        })
        if (!query.actId) {
            return
        }
        // 1. 增加访问量
        this.increateVisit(query)
        uni.hideShareMenu({
            hideShareItems: ['qq', 'qzone'],
        })
    }

    onUnload() {
        this.$store.commit('category/selectCateByIndex', 0)
        this.$store.commit('item/initItems')
    }

    hide() {
        console.log('parent receive:::')
        this.$store.commit('item/toggleModal')
    }

    onClickItem(e: any) {
        if (this.current === e.currentIndex) {
            return
        }
        this.$store.commit('item/initItems')
        this.$store.commit('category/selectCateByIndex', e.currentIndex)
        this.$store.dispatch('item/itemsByCate')
    }
    onShareAppMessage(res: any) {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline'],
        })
        const {id,code,name} = this.$store.state.item.item
        const {id:actId,name:actName} = this.$store.state.activity.activity
        console.log(`query onShareAppMessage::: id=${id}, actId=${actId}`,)
        return {
            title: `我是${code}号朋友，${name} 正在参加${actName}`,
            path: `/pages/detail/detail?id=${id}&actId=${actId}`,
            imageUrl: this.canvasUrl,
        }
    }

    /**
     * 增加访客量
     * @param {{actId: number}} query
     * @returns {Promise<void>}
     * @private
     */
    private increateVisit(query: { actId: number }) {
        this.$store.dispatch('activity/recordVisit', query.actId)
    }
}
</script>

<style scoped></style>
