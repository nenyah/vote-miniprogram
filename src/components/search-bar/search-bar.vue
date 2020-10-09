<template>
  <view class="border-img my-2 bg-theme-p-3 py-4" style="width: 756rpx;">
    <view class="w-full border border-r-0 border-l-0 border-t-0 border-solid border-white py-2" style="padding:0;">
      <view class="flex">
        <input
            type="text"
            class="flex-grow pl-2"
            :placeholder="placeholder"
            placeholder-class="text-gray-100"
            v-model="code"
        />
        <view class="flex-1 flex items-center justify-center">
          <view class="fa fa-search text-gray-100 pr-2"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import * as _ from "lodash"

export default Vue.extend({
  props: {
    placeholder: {type: String, default: "搜索编号查询"},
  },
  data() {
    return {
      code: "",
    }
  },
  watch: {
    code(newCode, oldCode) {
      console.log("触发", newCode, oldCode)
      if (_.isEmpty(newCode)) {
        this.$emit("clear")
      } else {
        this.$emit("updateItem", newCode)
      }
    },
  },
})
</script>

<style lang="scss" scoped>

.border-img {
  position: relative;
}

.border-img::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  background: $input-bg1-base64-code;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
}

.border-img::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  background: $input-bg2-base64-code;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
}
</style>
