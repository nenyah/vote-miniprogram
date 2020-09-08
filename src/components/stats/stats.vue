<template>
	<view>
		<view class="title">
			2020伊婉你最美比赛100强人气投票
		</view>
		<view class="table">
			<view class="data">
				<view class="content">
					<view class="num">100</view>
					<view class="name">参赛选手</view>
				</view>
				<view class="content">
					<view class="num">1678395</view>
					<view class="name">累计票数</view>
				</view>
				<view class="content">
					<view class="num">45597802</view>
					<view class="name">累计访问</view>
				</view>
			</view>
			<view class="endtime">活动结束时间还有{{lastdate}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
				lastdate:"2天",
			}
		},
		onLoad() {
	
		},
		methods: {
	
		},
		
	});
</script>

<style>

</style>
