<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:22:51
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-08 14:32:04
-->
<template>
	<view>
		<vote-rule></vote-rule>
		<view>
			<view class="attr">活动详情：</view>
			<view class="value">展开></view>
		</view>

	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	import voteRule from "@/components/vote-rule/vote-rule.vue";
	export default Vue.extend({
		data() {
			return {
				
			}
		},
		onLoad() {
	
		},
		methods: {
	
		},
		components:{
			voteRule
		}
	});
</script>

<style>

</style>
