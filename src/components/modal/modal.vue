<template>
  <view class="fixed top-0 left-0 right-0 bottom-0 modal-backdrop flex justify-center items-center z-30" @click="hide">
    <view class="w-11--12 h-full flex flex-col justify-center items-center">
      <image :src="src" mode="aspectFit" style="width: 680rpx;height: 800rpx;"></image>
      <view class="flex text-gray-100 w-full mt-2 text-center">
        <view class="flex-1 border border-gray-100 border-solid bg-gray-500 p-1"
              @click="save"
        >
          保存
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <button class="flex-1 border border-gray-100 border-solid bg-orange-500 p-1"
                open-type="share"
        >
          分享
        </button>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator"

@Component({})
export default class Modal extends Vue {
  @Prop() private src!: string
  @Prop() private itemid!: number

  @Emit("hide") send() {
  }

  hide() {
    console.log("modal click:::")
    this.send()
  }

  save() {
    uni.getImageInfo({
      src: this.src,
      success(files) {
        uni.showLoading({
          title: "图片保存中..."
        })
        uni.saveImageToPhotosAlbum({
          filePath: files.path,
          success(res) {
            console.log("--saveImageToPhotosAlbum----", res)
            uni.hideLoading()
            setTimeout(function () {
              uni.showModal({
                content: "图片已保存，赶紧去分享吧~",
                showCancel: false,
                confirmText: "好的",
                confirmColor: "#333",
                success: res => {
                  if (res.confirm) {
                  }
                }
              })
              uni.hideLoading()
            }, 200)
          },
          complete() {
            uni.hideLoading()
          }
        })
      }
    })
  }

  shareToTimeline() {
    // #ifdef APP-PLUS
    uni.share({
      provider: "weixin",
      scene: "WXSenceTimeline",
      type: 2,
      imageUrl: this.src,
      success: res => {
        console.log("success:" + JSON.stringify(res))
      },
      fail: err => {
        console.log("fail:" + JSON.stringify(err))
      }
    })
    // #endif
    // #ifdef MP-WEIXIN
    uni.showShareMenu({withShareTicket: true})
    // ***这地方两个配置都要写上 }) //
    // #endif
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
