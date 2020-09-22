<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 09:23:10
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-22 10:11:20
-->
<template>
  <view class="flex search-box border-img my-2">
    <view class="w-full" style="padding:0;">
      <view class="input-group flex">
        <input
          type="text"
          class="keyword form-control pl-2"
          :placeholder="placeholder"
          v-model="code"
        />
        <view class="flex items-center" style="background:#3945ad;">
          <view class="fa fa-search text-orange-500 pr-2"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: {
    placeholder: { type: String, default: "搜索编号、项目名称" },
  },
  data() {
    return {
      code: "",
    }
  },
  onLoad() {},
  watch: {
    code(newCode, oldCode) {
      this.$emit("updateItem", newCode)
    },
  },
  methods: {
    // handleInput(e: any) {
    //   console.log("输入内容:", e.detail.value)
    //   this.$emit("updateItem", e.detail.value)
    // },
  },
})
</script>

<style lang="scss" scoped>
.search-box {
  position: relative;
  overflow: hidden;
  .input-group {
    position: relative;
    width: 100%;
  }
  .input-group::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    height: 1px;
    border: 1px solid #6b76d1;
    z-index: 10;
  }
  .keyword {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #b6bdf3;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background: #3945ad;
    outline: none;
    box-shadow: none;
    border: none;
  }
  .keyword::placeholder {
    color: #b6bdf3;
  }
}
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
