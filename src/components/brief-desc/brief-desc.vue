<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:22:51
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-11 16:40:15
-->
<template>
  <view class="bg-color pt-4">
    <!-- 活动规则 -->
    <vote-rule></vote-rule>
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
      {{ activate.desc }}
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import voteRule from "@/components/vote-rule/vote-rule.vue"
export default Vue.extend({
  data() {
    return {
      activate: {
        desc: `2019，怎样才能在众多商户中脱颖而出?家家传媒给大家送福利来了!不管您经营的是餐饮、酒店、休闲娱乐，钻石珠宝,家装建材，婚庆影楼，还是家电数码，母婴，商行超市，农资特产，教育培训，品牌服务，广告设计，微店，制作业等……，只要您是石脑镇的商家，均可报名！我们的目的只有一个，利用互联网各种线上宣传形式，为商家推广，营销制作人气，提高市场关注度，增加商家的进店曝光率！温馨提示
      每个微信号每天可投3票，给同一选手一天限投一票。本活动重在参与，意在宣传推广，我们不提倡赠送礼物，赠送礼物属自愿行为，如有疑问请联系我们的在线客服奖项设置关于作弊
      活动方有权对票数异常的选手做出相应处罚，作弊违规行为包括但不限于：使用辅助软件的作弊行为、网上买僵尸号的投票行为、找投票公司付费投票行为。第一次电话口头警告并减去相关的票数，第二次再出现类似情况，不再另行通知，票数系统将自动清零，严重者取消参评资格和获奖资格。
      活动重在参与，意在宣传推广，打赏属自愿行为，我们不提倡给选手打赏，请酌情购买，主办方对本活动保留最终解释权！.`,
      },
      display: false,
    }
  },
  onLoad() {},
  methods: {
    expand() {},
  },
  components: {
    voteRule,
  },
})
</script>

<style lang="scss" scoped>
.bg-color {
  background-image: $rule-bg-base64-code;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
