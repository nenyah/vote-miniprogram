<!-- mosowe-canvas-image -->
<template>
  <view class='mosowe-canvas-image'>
		<view class="slot-view" @click="createCanvas">
			<slot></slot>
		</view>
		<view class="canvas-wrap">
			<canvas class="canvas-wrap" canvas-id="canvas" :style="'width: '+ width +'px; height: '+ height +'px;'"></canvas>
		</view>
	</view>
</template>

<script>
import QR from './wxqrcode.js';
export default {
  name: 'mosowe-canvas-image',
  components: {},
  props: {
		showPreview: { // 生成图像后是否预览
			type: Boolean,
			default: false
		},
	  height: { // canvas高度
			type: [String, Number],
			default: 200
		},
	  width: { // canvas宽度
			type: [String, Number],
			default: 200
		},
		lists: {
			type: Array,
			default: () => {
				return [// 图片，图片有先后，叠加画图
						{
							type: 'image',
							content: 'https://www.zhonglixunqing.cn/images/uniapp/1.jpg', // 图片url
							width: 200, // 图片绘制宽度
							height: 200, // 图片绘制高度
							x: 0, // 图片绘制X轴位置
							y: 0, // 图片绘制Y轴位置
							arc: false, // 圆形
							arcX: 0, // 圆的x坐标
							arcY: 0, // 圆的y坐标
							arcR: 0 // 圆的半径
						},
						{
							type: 'image',
							content: 'https://www.zhonglixunqing.cn/images/uniapp/2.jpg', // 图片url
							width: 100, // 图片绘制宽度
							height: 100, // 图片绘制高度
							x: 0, // 图片绘制X轴位置
							y: 0, // 图片绘制Y轴位置
							arc: false, // 圆形，如果需要圆形图片绘制，请放在列表最后，否则后续绘制将在此圆形内
							arcX: 0, // 圆的x坐标
							arcY: 0, // 圆的y坐标
							arcR: 0 // 圆的半径
						},
						{
							type: 'text',
							content: '你好', // 文字
							x: 10, // X轴
							y: 50, // Y轴
							color: '#ff0000', // 颜色
							size: 20, // 字号
							maxWidth: 100, // 最大宽度
							align: 'left', // 对齐方式
						},
						{
							type: 'image',
							content: 'https://www.zhonglixunqing.cn/images/uniapp/3.jpg', // 图片url
							width: 100, // 图片绘制宽度
							height: 100, // 图片绘制高度
							x: 150, // 图片绘制X轴位置
							y: 150, // 图片绘制Y轴位置
							arc: true, // 圆形，如果需要圆形图片绘制，请放在列表最后，否则后续绘制将在此圆形内
							arcX: 200, // 圆的x坐标
							arcY: 200, // 圆的y坐标
							arcR: 50 // 圆的半径
						},
					];
			}
		}
	},
  data () {
    return {
			canvas: null,
			listsIndex: 0,
			listsLength: 0
    };
  },
	watch: {},
  // 组件实例化之前 
  beforeCreate () {},
  // 组件创建完成
  created () {
		this.canvas = uni.createCanvasContext('canvas', this);
	},
  // 组件挂载之前
  beforeMount () {},
  // 组件挂载之后
  mounted () {},
  // 组件数据更新时
  beforeUpdate () {},
  // 组价更新
  updated () {},
  // 组件销毁前
  beforeDestroy () {},
  // 组件销毁后
  destroyed () {},
  // 页面方法
  methods: {
		// 开始绘制
		createCanvas () {
			this.listsIndex = 0;
			this.listsLength = this.lists.length - 1;
			// #ifndef H5
				uni.showLoading();
			// #endif
			// #ifdef H5
				uni.showLoading({
					mask: true
				});			
			// #endif

			this.dataDrawCanvas();
		},
		// 数据绘制
		dataDrawCanvas () {
			let item = this.lists[this.listsIndex];
			if (item.type === 'image') { // 图片
				// #ifndef H5
				// 非H5
				this.downloadImageNotH5(item);
				// #endif
				// #ifdef H5
				// H5
				this.downloadImageH5(item);
				// #endif
			} else if (item.type === 'text') { // 文本
				this.drawText(item);
			} else if (item.type === 'rect') { // 矩形（线条）
				this.drawRect(item);
			} else if (item.type === 'arc') { // 圆形
				this.drawArc(item);
			} else if (item.type === 'qr') { // 二维码
				this.drawQR(item);
			}
		},
		// #ifndef H5
		// 图片下载本地并绘制，非H5
		downloadImageNotH5 (item) {
			uni.downloadFile({
				url: item.content,
				header: {
					'Access-Control-Allow-Origin': '*',
				},
				success: (res) => {
					if (item.hasOwnProperty('arc') && item.arc) { // 绘制圆形
						this.canvas.arc(item.arcX, item.arcY, item.arcR, 0, 2 * Math.PI);
						this.canvas.clip();
						this.canvas.closePath();
					}
					this.canvas.drawImage(
						res.tempFilePath, 
						item.x, 
						item.y, 
						item.hasOwnProperty('width') ? item.width : this.width, 
						item.hasOwnProperty('height') ? item.height : this.height
					);
					this.checkDrawOver();
				},
				fail: (res) => {
					console.log(res);
					uni.hideLoading();
				}
			});			
			
		},
		// #endif
		// #ifdef H5
		// 图片下载本地并绘制，H5
		downloadImageH5 (item) {
			let image = new Image();
			image.setAttribute('crossOrigin', 'anonymous');
			image.src = item.content;
			image.onload = () => {
				if (item.arc) { // 绘制圆形
					this.canvas.arc(item.arcX, item.arcY, item.arcR, 0, 2 * Math.PI);
					this.canvas.clip();
					this.canvas.closePath();
				}
				this.canvas.drawImage(
					item.content, 
					item.x, 
					item.y, 
					item.hasOwnProperty('width') ? item.width : this.width, 
					item.hasOwnProperty('height') ? item.height : this.height
				);
				this.checkDrawOver();
			};
		},
		// #endif
		// 文本绘制
		drawText (item) {
				this.canvas.setFillStyle(item.hasOwnProperty('color') ? item.color : '#000000');
				this.canvas.setFontSize(item.hasOwnProperty('size')? item.size : 20);
				this.canvas.setTextAlign(item.hasOwnProperty('align') ? item.align: 'left');
				if (item.maxWidth) {
					this.canvas.fillText(item.content, item.x, item.y, item.maxWidth);
				} else {
					this.canvas.fillText(item.content, item.x, item.y);
				}
				this.checkDrawOver();
		},
		
		// 矩形（线条）绘制
		drawRect (item) {
			this.canvas.setFillStyle(item.hasOwnProperty('color') ? item.color : '#000000');
			this.canvas.fillRect(item.x, item.y, item.width, item.height);
			this.checkDrawOver();
		},
		
		// 圆形绘制
		drawArc (item) {
			this.canvas.arc(item.arcX, item.arcY, item.arcR, 0, 2 * Math.PI);
			this.canvas.setFillStyle(item.hasOwnProperty('color') ? item.color : '#000000');
			this.canvas.fill();
			this.canvas.closePath();
			this.checkDrawOver();
		},
		
		// 二维码绘制
		drawQR (item) {
				item['qr'] = QR.createQrCodeImg(item.content, {  
					size: parseInt(300)  
				});
				this.canvas.drawImage(
					item.qr, 
					item.x, 
					item.y, 
					item.hasOwnProperty('width') ? item.width : this.width, 
					item.hasOwnProperty('height') ? item.height : this.height
				);
				this.checkDrawOver();
		},
		
		// 判断是否绘制完
		 checkDrawOver () {
			 if (this.listsIndex < this.listsLength) { // lists未画完
			 	this.listsIndex++;
			 	this.dataDrawCanvas();
			 } else {
			 	this.canvasImage();
			 }
		 },
		
		// 绘制到画布并生成图片
		canvasImage () {
			this.canvas.draw(false, setTimeout(() => {
				setTimeout(() => {
					// #ifndef MP-ALIPAY
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: Number(this.width),
						height: Number(this.height),
						fileType: 'jpg',
						canvasId: 'canvas',
						success: (res) => {
							this.$emit('canvasImage', res.tempFilePath);
							if (this.showPreview) {
								this.showPreviewFn(res.tempFilePath);
							}
						},
						fail: (res) => {
							console.log(res);
						},
						complete: () => {
							uni.hideLoading();
						}
					}, this);
					// #endif
					// #ifdef MP-ALIPAY
					// 支付宝的
					// #endif
				}, 500);
			}));
		},
		// 预览图
		showPreviewFn (img) {
			uni.previewImage({
				current: 0,
				urls: [img]
			});
		},
	}
};
</script>
<style lang='scss' scoped>
.mosowe-canvas-image{
	overflow: hidden;
	.canvas-wrap {
		overflow: hidden;
		height: 0;
		width: 0;
	}
}
</style>