<template>
	<view >
		<view v-if="actId<0" class="text-gray-900 p-2">
			<view v-for="activity in activities" :key="activity.id" class="my-2 text-center text-gray-500 rounded shadow">
				<view :data-id="activity.id" @click="toIndex">
					<image :src="formatUrl(activity)" mode="aspectFill" class="rounded rounded-b-none w-full h-24"></image>
					<view class="p-2 text-left">
						<view class="text-gray-900">{{ activity.name }}</view>
						<view class="flex items-center">
							<view class="fa fa-group mr-1 text-red-300 text-center"></view>
							<view>{{ activity.stats[1].value }}人参与，已投票：</view>
							<view>{{ activity.stats[2].value }}</view>
						</view>
						<view class="flex items-center">
							<view class="fa fa-clock-o mr-1 text-red-300 text-center"></view>
							<view>
								{{ formatTime(activity.endTime) }} 结束
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="bg-purple">
			<!-- 广告轮播图 -->
			<banner :src="activity.bannerImg"></banner>
			<!-- 主题名称 -->
			<title :content="activity.name"></title>
			<!-- 统计区域 -->
			<stats :content="activity.stats">
				<view class="mt-2 p-2 text-gray-100 text-center diff-time-box flex justify-center">
					<view v-if="!(activity.status === 'ENDED')">
						{{ msg }}
						<uni-countdown color="#fff" background-color="" splitorColor="#fff" :day="day" :hour="hour" :minute="min" :second="sec"
						 :showDay="showDay"></uni-countdown>
					</view>
					<view v-else>{{ msg }}</view>
				</view>
			</stats>
			<!-- 规则区域 -->
			<view class="bg-color pt-4">
				<!-- 活动规则 -->
				<vote-rule :activity="activity"></vote-rule>
				<!-- 活动详情 -->
				<view class="text-white flex px-4">
					<view class="attr">
						<view class="fa fa-clock-o text-orange-500 mr-2"></view>
						活动详情：
					</view>
					<view class="flex" @click="display = !display">
						{{ display ? "收起" : "展开" }}
						<view class="text-orange-500 ml-2">></view>
					</view>
				</view>
				<!-- 详情描述 -->
				<view v-if="display" class="my-3 text-gray-100 px-4">
					{{ activity.description }}
				</view>
			</view>
			<!-- 搜索区域 -->
			<search-bar @updateItem="handleInput"></search-bar>
			<!-- 项目列表区域 -->
			<vote-list :items="items" :itemType="itemType"></vote-list>
			<!-- 脚注区域 -->
			<vote-footer :content="activity.name"></vote-footer>
			<view class="text-gray-900 bg-gray-200 rounded-full flex justify-center items-center" @click="back" style="width: 3rem;height: 3rem;position: fixed;bottom: 2rem;right: 0.5rem;z-index: 9999;">返回</view>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from "vue"
	import banner from "@/components/banner/banner.vue"
	import title from "@/components/title/title.vue"
	import stats from "@/components/stats/stats.vue"
	import voteRule from "@/components/vote-rule/vote-rule.vue"
	import searchBar from "@/components/search-bar/search-bar.vue"
	import voteList from "@/components/vote-list/vote-list.vue"
	import voteFooter from "@/components/footer/footer.vue"
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import {
		getItems
	} from "@/servise/items"
	import {
		getActivities,
		putVisits
	} from "@/servise/activates"
	import {
		activities,
		items
	} from "@/mock/store"
	import moment from "moment"
	import {
		Iactivity,IglobalData
	} from "@/common/interface"
	import * as _ from "lodash"

	moment().locale("zh-cn")

	interface Query {
		id: number
	}
	
	
	export default Vue.extend({
		data() {
			return {
				items,
				actId: -1,
				activities:[] as Iactivity[],
				activity: {} as Iactivity,
				code: "",
				dbouncedGetItems: () => {},
				day: 0,
				hour: 0,
				min: 1,
				sec: 30,
				itemType: "vote",
				display: false,
				showDay: false,
				msg: "活动已经结束",
			}
		},
		async onLoad(query) {
			// 判断是否登录
			await this._isLogin()
			// 1. 服务器接口获取活动信息
			this.activities = await this._getActivities()
			// 2. 活动信息存入globaldata
			let globalData: any = getApp().globalData
			globalData.activities = this.activities
			// 添加事件监听
			uni.$on("update", (data) => {
				console.log("监听到事件来自 update ，携带参数 msg 为：" + data.msg)
				this._getActivity()
				this._getItems()
			})
			// 添加防抖
			this.dbouncedGetItems = _.debounce(this._getItems, 500)
		},
		onUnload() {
			uni.$off("update", function(data) {
				console.log("监听到事件来自 update ，携带参数 msg 为：" + data.msg)
			})
		},
		methods: {
			back(){
				this.actId=-1
				let globaldata = getApp().globalData as IglobalData
				globaldata.currentActId = -1
			},
			// 获取活动信息
			async _getActivities() {
				try {
					let {
						data
					}: any = await getActivities(1)
					return data.data
				} catch (error) {
					return activities
				}
			},
			async _isLogin() {
				// 判断是否登录
				// 1. 检查是否有缓存,有登录进入对应页面
				// 2. 没有就进入登录授权页面
				uni.getStorage({
					key: "userInfo",
					success: async (res) => {
						console.log("缓存数据用户信息", res)
					},
					fail: (err) => {
						console.error("微信登录错误信息", err)
						uni.redirectTo({
							url: "../login/login",
						})
					},
				})
			},
			async toIndex(e: any) {
				console.log("e:", e.currentTarget.dataset.id)
				let globaldata = getApp().globalData as IglobalData
				globaldata.currentActId=e.currentTarget.dataset.id
				this.actId=e.currentTarget.dataset.id
				// 增加访问量
				try {
					await putVisits(e.currentTarget.dataset.id)
				} catch (error) {
					console.error("增加访问量失败", error)
				}
				/**
				 * 1. 下载活动信息
				 * 2. 下载选手信息
				 */
				// 2. 下载活动信息
				await this._getActivity()
				// 设置标题
				uni.setNavigationBarTitle({
					title: this.activity?.name,
				})
				// 3. 下载选手信息
				await this._getItems()
				// 4. 存入当前活动id
				// let globalData: any = getApp().globalData
				// globalData.currentActId = +query?.id
				// 5. 计算时间
				// 获取活动时间
				let {
					startTime,
					endTime,
					status
				}: any = this.activity
				//  获取当前时间
				let now = moment()
				startTime = moment(startTime)
				endTime = moment(endTime)
				let duration = moment.duration(startTime.diff(now))
				
				// 根据状态显示不同内容
				if (status === "ISCOMING") {
					this.msg = "活动开始还有"
					this.setCountDown(duration)
				} else if (status === "ONGOING") {
					this.msg = "活动结束还有"
					duration = moment.duration(endTime.diff(now))
					this.setCountDown(duration)
				}
				console.log(`now:${now}, startTime:${startTime}, endTime:${endTime}`)
			},
			setCountDown: function(duration: moment.Duration) {
				if (duration.days() > 0) {
					this.showDay = true
					this.day = duration.days()
					this.hour = duration.hours()
					this.min = duration.minutes()
					this.sec = duration.seconds()
				} else {
					this.hour = duration.hours()
					this.min = duration.minutes()
					this.sec = duration.seconds()
				}
			},
			handleInput(e: any) {
				this.code = e
				this.dbouncedGetItems()
			},
			// 获取活动信息
			async _getActivity() {
				try {
					// 下载最新活动信息
					let {
						data
					}: any = await getActivities(1)
					// 根据actId筛选
					this.activity = data.data.filter(
						(el: Iactivity) => el.id == this.actId
					)[0]
				} catch (error) {
					console.error("下载活动信息出错", error)
					uni.showToast({
						title: `${error}`,
					})
					this.activity = activities.filter(
						(el: Iactivity) => el.id === this.actId
					)[0]
				}
			},
			async _getItems() {
				try {
					let {
						data
					} = await getItems({
						activityId: this.actId,
						code: this.code,
					})
					this.items = data.data
				} catch (error) {
					this.items = items
					console.error("获取选手信息出错", error)
				}
			},
		},
		computed: {
			formatUrl() {
				return (params: Iactivity) => {
					return params.bannerImg[0]
				}
			},
			formatTime() {
				return (params: string) => {
					return params.substr(0, 16).replace("T", " ")
				}
			}
		},
		components: {
			banner,
			title,
			stats,
			voteRule,
			searchBar,
			voteList,
			voteFooter,
			uniCountdown,
		},
	})
</script>

<style lang="scss" scoped>
	.diff-time-box {
		margin: 2px;
		padding: 4px 0;
		background: url("/static/diff-time.png") no-repeat;
		background-size: 100% 100%;
		border: none;
		border-radius: 0;
	}

	.bg-color {
		background-image: $rule-bg-base64-code;
		background-size: 100%;
		background-repeat: no-repeat;
	}
</style>
