<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:22:09
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-08 14:25:57
-->
<template>
	<view>
		<title></title>
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
	import title from "@/components/title/title.vue";
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
		components:{
			title
		}
		
	});
</script>

<style>

</style>
