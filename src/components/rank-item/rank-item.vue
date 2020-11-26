<template>
    <view
        :class="{ 'bg-theme-p-2': isActive }"
        class="flex w-4-5 my-2 py-2 text-center rounded items-center"
    >
        <view class="flex justify-center flex-1 text-center">
            <view v-if="index<3">
                <image :src="`/static/${index+1}.png`" class="w-6 h-6"></image>
            </view>
            <view v-else>{{ index + 1 }}</view>
        </view>
        <view class="flex-1 text-center">{{ item.code }}</view>
        <view class="flex-1 text-center" @tap="toUrl">{{ item.name }}</view>
        <view class="flex-1 text-center">{{ item.stats[0].value }}</view>
    </view>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {Iitem} from "@/common/Item"

@Component
export default class RankItem extends Vue {
    [x: string]: any
    @Prop() private item!: Iitem
    @Prop() private index!: number


    get isActive() {
        return this.index % 2 === 0
    }

    toUrl() {
        this.$store.commit("item/setItem", this.item)
        uni.navigateTo({
            url: `/pages/detail/detail?id=${this.item.id}`
        })
    }
}
</script>

<style lang="scss" scoped>
</style>
