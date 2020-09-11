<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-11 12:30:27
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-11 12:31:50
-->
<template>
<view class="text-lg flex py-auto items-center">
    <view class="mr-1 ">{{title}}</view>
    <image src="/static/rule-icon.png" class="w-4 h-4">
</view>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:{
        title:String,
    }
})
</script>

<style>

</style>