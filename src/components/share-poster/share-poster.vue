<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-17 13:23:59
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-18 13:40:18
-->
<template>
  <view class="page">
    <button type="default" @click="beginCanvas">开始绘图</button>
    <image :src="canvasUrl" mode="widthFix"></image>
    <mosowe-canvas-image
      ref="mosoweCanvasComponents"
      @canvasImage="_canvasImage"
      :lists="lists"
      height="400"
      width="300"
      showPreview
    />
  </view>
</template>

<script lang="ts">
import mosoweCanvasImage from "@/components/mosowe-canvas-image/mosowe-canvas-image.vue"
import Vue, { VueConstructor } from "vue"
export default Vue.extend({
  components: { mosoweCanvasImage },
  data() {
    return {
      canvasUrl: {} as any,
      lists: [
        // 图片，图片有先后，叠加画图
        {
          type: "image",
          content: "http://192.168.0.175:9000/test/bg.jpg", // 图片url
          width: 300, // 图片绘制宽度
          height: 400, // 图片绘制高度
          x: 0, // 图片绘制X轴位置
          y: 0, // 图片绘制Y轴位置
          arc: false, // 圆形
          arcX: 0, // 圆的x坐标
          arcY: 0, // 圆的y坐标
          arcR: 0, // 圆的半径
        },
        {
          type: "text",
          content: "2020伊婉你最美", // 文字
          x: 150, // X轴
          y: 20, // Y轴
          color: "#fff", // 颜色
          size: 10, // 字号
          maxWidth: 100, // 最大宽度
          align: "center", // 对齐方式
        },
        {
          type: "text",
          content: "1 号", // 文字
          x: 150, // X轴
          y: 190, // Y轴
          color: "#000", // 颜色
          size: 20, // 字号
          maxWidth: 100, // 最大宽度
          align: "center", // 对齐方式
        },
        {
          type: "text",
          content: "漂亮组", // 文字
          x: 150, // X轴
          y: 220, // Y轴
          color: "#000", // 颜色
          size: 18, // 字号
          maxWidth: 100, // 最大宽度
          align: "center", // 对齐方式
        },
        {
          type: "qr",
          content: "https://www.zhonglixunqing.cn/images/uniapp/1.jpg", // 图片url
          width: 100, // 图片绘制宽度
          height: 100, // 图片绘制高度
          x: 100, // 图片绘制X轴位置
          y: 250, // 图片绘制Y轴位置
          arc: false, // 圆形
          arcX: 0, // 圆的x坐标
          arcY: 0, // 圆的y坐标
          arcR: 0, // 圆的半径
        },
        {
          type: "image",
          content: "http://192.168.0.175:9000/test/avatar.png", // 图片url
          width: 110, // 图片绘制宽度
          height: 110, // 图片绘制高度
          x: 100, // 图片绘制X轴位置
          y: 35, // 图片绘制Y轴位置
          arc: false, // 圆形
          arcX: 0, // 圆的x坐标
          arcY: 0, // 圆的y坐标
          arcR: 0, // 圆的半径
        },
      ],
    }
  },
  methods: {
    beginCanvas() {
      let child: any = this.$refs.mosoweCanvasComponents
      child.createCanvas()
    },
    _canvasImage(e: string) {
      this.canvasUrl = e
      console.log("图片", e)
      // 网络图片需要先进行下载然后直接保存到相册
      // this.saveHttpImg(e);
      // 本地图片可以直接保存到相册
      //   this.save(e)
      //   uni.redirectTo({
      //     url: `/pages/index/index`,
      //   })
    },
    saveHttpImg(url: string): void {
      uni.downloadFile({
        url: url, //仅为示例，并非真实的资源
        success: (res) => {
          if (res.statusCode === 200) {
            let file = res.tempFilePath
            this.save(file)
          }
        },
      })
    },
    save(url: string) {
      uni.saveImageToPhotosAlbum({
        filePath: url,
        success: () => {
          uni.hideLoading()
          uni.showToast({
            title: "图片已保存",
          })
        },
        fail: () => {
          uni.hideLoading()
          uni.showToast({
            title: "图片保存失败",
          })
        },
      })
    },
  },
})
</script>

<style scoped></style>
