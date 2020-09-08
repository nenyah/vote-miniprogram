<template>
	<view class="content">
		<banner></banner>
		<stats></stats>
		<brief-desc></brief-desc>
		<search-bar></search-bar>
		<vote-list></vote-list>
	</view>


</template>

<script>
	import Vue from 'vue';
	import banner from "@/components/banner/banner";
	import stats from "@/components/stats/stats";
	import briefDesc from "@/components/brief-desc/brief-desc";
	import searchBar from "@/components/search-bar/search-bar";
	import voteList from "@/components/vote-list/vote-list";

	export default Vue.extend({
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		},
		components: {
			banner,
			stats,
			briefDesc,
			searchBar,
			voteList,
		}
	});
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}
</style>
