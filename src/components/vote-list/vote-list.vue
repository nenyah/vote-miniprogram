<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:24:10
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-08 14:04:51
-->
<template>
	<view>
		<view v-for="item in items" :key="item.id">
			<vote-item :item="item"></vote-item>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	import voteItem from "@/components/vote-item/vote-item.vue";
	import {items} from "@/mock/store.ts";
	export default Vue.extend({
		data() {
			return {
				items
			}
		},
		onLoad() {

		},
		methods: {

		},
		components: {
			voteItem
		}
	});
</script>

<style>

</style>
