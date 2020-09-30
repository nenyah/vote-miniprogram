<template>
  <view class="fixed top-0 left-0 right-0 bottom-0 modal-backdrop flex justify-center items-center z-30" @click="hide">
    <view class="w-11--12 h-full flex justify-center items-center">
      <image :src="src" mode="aspectFit" class="w-full h-full"></image>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator"

@Component({})
export default class modal extends Vue {
  @Prop() private src!: string

  @Emit("hide") send() {
  }

  hide() {
    console.log("modal click:::")
    this.send()
  }
}
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.3);
}
.h-4--5 {
  height: calc(80%);
}


</style>
