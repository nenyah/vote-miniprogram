<template>
  <view class="modal-backdrop">
    <view class="modal">
      <view class="modal-header">
        <view>确定为以下人员投票吗？</view>
      </view>
      <view class="modal-body flex justify-center items-center" v-for="item in voteItems" :key="item.id">
        <text class="flex-1">{{ item.code }}号</text>
        <text class="flex-1">{{ item.name }}</text>
        <text class="flex-1">{{ item.stats[0].value }}票</text>
      </view>
      <view class="modal-footer">
        <button type="button" class="btn-close" @click="cancel">取消</button>
        <button type="button" class="btn-confirm" @click="confirm">确认</button>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({})
export default class modal extends Vue {
  @Prop() private voteItems!: []

  private cancel() {
    this.$emit("cancel")
  }
  private confirm() {
    this.$emit("confirm")
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background-color: #fff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  width: 600rpx;
}
.modal-header {
  border-bottom: 1px solid #eee;
  color: #313131;
  justify-content: space-between;
  padding: 15px;
  display: flex;
}
.modal-footer {
  border-top: 1px solid #eee;
  justify-content: flex-end;
  padding: 15px;
  display: flex;
}
.modal-body {
  position: relative;
  padding: 20px 10px;
}
.btn-close,
.btn-confirm {
  border-radius: 8px;
  margin-left: 16px;
  width: 56px;
  height: 36px;
  border: none;
  cursor: pointer;
}
.btn-close {
  color: #313131;
  background-color: transparent;
}
.btn-confirm {
  color: #fff;
  background-color: #2d8cf0;
}
</style>
