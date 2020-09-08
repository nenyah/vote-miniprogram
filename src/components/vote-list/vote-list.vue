<template>
	<view>
		<view v-for="item in items" :key="item.id">
			<vote-item :item="item"></vote-item>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	import voteItem from "@/components/vote-item/vote-item";
	import {items} from "@/mock/store";
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
