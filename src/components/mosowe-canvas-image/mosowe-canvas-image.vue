<!-- mosowe-canvas-image -->
<template>
  <view class="mosowe-canvas-image">
    <view class="slot-view" @click="createCanvas">
      <slot></slot>
    </view>
    <view class="canvas-wrap">
      <canvas
        class="canvas-wrap"
        canvas-id="canvas"
        :style="'width: ' + width + 'px; height: ' + height + 'px;'"
      ></canvas>
    </view>
  </view>
</template>

<script>
import QR from "./wxqrcode.js"
export default {
  name: "mosowe-canvas-image",
  components: {},
  props: {
    showPreview: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
      default: 200,
    },
    width: {
      type: [String, Number],
      default: 200,
    },
    lists: {
      type: Array,
      default: () => {
        return [
          {
            type: "image",
            content: "https://www.zhonglixunqing.cn/images/uniapp/1.jpg", 
            width: 200, 
            height: 200, 
            x: 0, 
            y: 0, 
            arc: false, 
            arcX: 0, 
            arcY: 0, 
            arcR: 0,
          },
          {
            type: "image",
            content: "https://www.zhonglixunqing.cn/images/uniapp/2.jpg", 
            width: 100, 
            height: 100, 
            x: 0, 
            y: 0, 
            arc: false,
            arcX: 0, 
            arcY: 0, 
            arcR: 0, 
          },
          {
            type: "text",
            content: "你好", 
            x: 10, 
            y: 50, 
            color: "#ff0000", 
            size: 20, 
            maxWidth: 100, 
            align: "left", 
          },
          {
            type: "image",
            content: "https://www.zhonglixunqing.cn/images/uniapp/3.jpg", 
            width: 100, 
            height: 100, 
            x: 150, 
            y: 150, 
            arc: true,
            arcX: 200, 
            arcY: 200, 
            arcR: 50, 
          },
        ]
      },
    },
  },
  data() {
    return {
      canvas: null,
      listsIndex: 0,
      listsLength: 0,
    }
  },
  watch: {},
  // 组件实例化之前
  beforeCreate() {},
  // 组件创建完成
  created() {
    this.canvas = uni.createCanvasContext("canvas", this)
  },
  // 组件挂载之前
  beforeMount() {},
  // 组件挂载之后
  mounted() {},
  // 组件数据更新时
  beforeUpdate() {},
  // 组价更新
  updated() {},
  // 组件销毁前
  beforeDestroy() {},
  // 组件销毁后
  destroyed() {},
  // 页面方法
  methods: {
    // 开始绘制
    createCanvas() {
      console.log("开始绘图")
      this.listsIndex = 0
      this.listsLength = this.lists.length - 1
      // #ifndef H5
      uni.showLoading()
      // #endif
      // #ifdef H5
      uni.showLoading({
        mask: true,
      })
      // #endif

      this.dataDrawCanvas()
    },
    // 数据绘制
    dataDrawCanvas() {
      let item = this.lists[this.listsIndex]
      if (item.type === "image") {
        // 图片
        // #ifndef H5
        // 非H5
        this.downloadImageNotH5(item)
        // #endif
        // #ifdef H5
        // H5
        this.downloadImageH5(item)
        // #endif
      } else if (item.type === "text") {
        // 文本
        this.drawText(item)
      } else if (item.type === "rect") {
        // 矩形（线条）
        this.drawRect(item)
      } else if (item.type === "arc") {
        // 圆形
        this.drawArc(item)
      } else if (item.type === "qr") {
        // 二维码
        this.drawQR(item)
      }
    },
    // #ifndef H5
    // 图片下载本地并绘制，非H5
    downloadImageNotH5(item) {
      uni.downloadFile({
        url: item.content,
        header: {
          "Access-Control-Allow-Origin": "*",
        },
        success: (res) => {
          console.log("成功下载", res)
          if (item.hasOwnProperty("arc") && item.arc) {
            // 绘制圆形
            this.canvas.arc(item.arcX, item.arcY, item.arcR, 0, 2 * Math.PI)
            this.canvas.clip()
            this.canvas.closePath()
          }
          this.canvas.drawImage(
            res.tempFilePath,
            item.x,
            item.y,
            item.hasOwnProperty("width") ? item.width : this.width,
            item.hasOwnProperty("height") ? item.height : this.height
          )
          this.checkDrawOver()
        },
        fail: (res) => {
          console.log(res)
          uni.hideLoading()
        },
      })
    },
    // #endif
    // #ifdef H5
    // 图片下载本地并绘制，H5
    downloadImageH5(item) {
      let image = new Image()
      image.setAttribute("crossOrigin", "anonymous")
      image.src = item.content
      image.onload = () => {
        if (item.arc) {
          // 绘制圆形
          this.canvas.arc(item.arcX, item.arcY, item.arcR, 0, 2 * Math.PI)
          this.canvas.clip()
          this.canvas.closePath()
        }
        this.canvas.drawImage(
          item.content,
          item.x,
          item.y,
          item.hasOwnProperty("width") ? item.width : this.width,
          item.hasOwnProperty("height") ? item.height : this.height
        )
        this.checkDrawOver()
      }
    },
    // #endif
    // 文本绘制
    drawText(item) {
      this.canvas.setFillStyle(
        item.hasOwnProperty("color") ? item.color : "#000000"
      )
      this.canvas.setFontSize(item.hasOwnProperty("size") ? item.size : 20)
      this.canvas.setTextAlign(
        item.hasOwnProperty("align") ? item.align : "left"
      )
      if (item.maxWidth) {
        this.canvas.fillText(item.content, item.x, item.y, item.maxWidth)
      } else {
        this.canvas.fillText(item.content, item.x, item.y)
      }
      this.checkDrawOver()
    },

    // 矩形（线条）绘制
    drawRect(item) {
      this.canvas.setFillStyle(
        item.hasOwnProperty("color") ? item.color : "#000000"
      )
      this.canvas.fillRect(item.x, item.y, item.width, item.height)
      this.checkDrawOver()
    },

    // 圆形绘制
    drawArc(item) {
      this.canvas.arc(item.arcX, item.arcY, item.arcR, 0, 2 * Math.PI)
      this.canvas.setFillStyle(
        item.hasOwnProperty("color") ? item.color : "#000000"
      )
      this.canvas.fill()
      this.canvas.closePath()
      this.checkDrawOver()
    },

    // 二维码绘制
    drawQR(item) {
      item["qr"] = QR.createQrCodeImg(item.content, {
        size: parseInt(300),
      })
      this.canvas.drawImage(
        item.qr,
        item.x,
        item.y,
        item.hasOwnProperty("width") ? item.width : this.width,
        item.hasOwnProperty("height") ? item.height : this.height
      )
      this.checkDrawOver()
    },

    // 判断是否绘制完
    checkDrawOver() {
      if (this.listsIndex < this.listsLength) {
        // lists未画完
        this.listsIndex++
        this.dataDrawCanvas()
      } else {
        this.canvasImage()
      }
    },

    // 绘制到画布并生成图片
    canvasImage() {
      this.canvas.draw(
        false,
        setTimeout(() => {
          setTimeout(() => {
            // #ifndef MP-ALIPAY
            uni.canvasToTempFilePath(
              {
                x: 0,
                y: 0,
                width: Number(this.width),
                height: Number(this.height),
                fileType: "jpg",
                canvasId: "canvas",
                success: (res) => {
                  this.$emit("canvasImage", res.tempFilePath)
                  if (this.showPreview) {
                    this.showPreviewFn(res.tempFilePath)
                  }
                },
                fail: (res) => {
                  console.log(res)
                },
                complete: () => {
                  uni.hideLoading()
                },
              },
              this
            )
            // #endif
            // #ifdef MP-ALIPAY
            // 支付宝的
            // #endif
          }, 500)
        })
      )
    },
    // 预览图
    showPreviewFn(img) {
      uni.previewImage({
        current: 0,
        urls: [img],
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.mosowe-canvas-image {
  overflow: hidden;
  .canvas-wrap {
    overflow: hidden;
    height: 0;
    width: 0;
	position: fixed;
	left: -10000;
	top: -10000;
  }
}
</style>
