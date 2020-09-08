<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:24:24
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-08 14:16:43
-->
<template>
	<view>
		<view class="code">{{item.id}}</view>
		<navigator url="#">
			<image :src="item.img" mode=""></image>
			<view class="name">{{item.name}}</view>
			<view class="group">{{item.group}}</view>
		</navigator>
		
		<view class="vote">
			<view class="vote-num">{{item.vote}}</view>
			<view class="button">投票</view>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {

			}
		},
		props: {
			item: Object
		},
		onLoad() {

		},
		methods: {

		},
	});
</script>

<style>

</style>
