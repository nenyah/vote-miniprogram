## mosowe-canvas-image：一个可以制作多用途图片的插件（海报，二维码，分享图）

#### 平台支持：

| APP  |  H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 字节跳动小程序 | QQ小程序 |
| :--: | :--: | :--------: | :----------: | :--------: | :------------: | :------: |
|  √   |  √   |     √      |      ×       |    未测    |      未测      |   未测   |

#### 插件功能

1. 支持多图片绘制，多文本绘制，圆形图片绘制；
2. 支持矩形（线条）绘制；
3. 支持圆形绘制；
4. 支持二维码生成，项目用不上可以去插件内去除，毕竟这个插件携带的比较大，单纯用来生成二维码图片也是阔以的；
5. 支持绘图后预览。

多用于海报图，分享图；

注意H5跨域问题及小程序白名单配置；

图片是网络图片：https://....（require及import引入不了3Kb以上的绝对路径图片，若有大神知道处理方法，望不吝赐教，谢谢！）

#### 属性

| 名称        | 类型             | 默认值 | 说明                                                     |
| :---------- | :--------------- | :----- | :------------------------------------------------------- |
| width       | Number \| String | 200    | canvas画布宽度，也是导出图片宽度，单位px，值中不要带单位 |
| height      | Number \| String | 200    | canvas画布高度，也是导出图片高度，单位px，值中不要带单位 |
| showPreview | Boolean          | false  | 绘制完成后是否打开预览                                   |
| lists       | Array            | []     | 绘制的元素列表：图片，文字，矩形（线条），圆形，二维码   |

#### lists\<item>属性

注意：图文先后顺序，底层的图片靠前，最上层的在最后，圆形图片放在最后，因为一旦绘制圆形，后续的元素都只在该圆形内显示，而超过圆形范围的将看不见。

| 名称     | 类型   | 必填 | 说明                                                         |
| :------- | :----- | :--- | :----------------------------------------------------------- |
| type     | String | 是   | 元素类型：`image`图片，`text`文本，`rect`矩形（线条），`arc`圆形，`qr`二维码 |
| content  | String | 否   | image：图片路径（必填），text：文字（必填），qr：转二维码的数据（必填），rect及arc：非必填 |
| x        | Number | 是   | X轴坐标，绘制圆形图片时：x = arcX - arcR                     |
| y        | Number | 是   | Y轴坐标，绘制圆形图片时：y = arcY - arcR                     |
| width    | Number | 否   | 图片、矩形（线条）、二维码宽度                               |
| height   | Number | 否   | 图片、矩形（线条）、二维码高度                               |
| arc      | Boolen | 否   | type=image时：是否绘制圆形图片                               |
| arcX     | Number | 否   | type=image、arc时：绘制圆形时中心点X轴坐标                   |
| arcY     | Number | 否   | type=image、arc时：绘制圆形时中心点Y轴坐标                   |
| arcR     | Number | 否   | type=image、arc时：绘制圆形的半径                            |
| color    | String | 否   | 绘制文本、矩形（线条）的颜色，默认：#000000                  |
| size     | Number | 否   | 绘制文本的字号大小，默认：20                                 |
| align    | String | 否   | 绘制文本的对齐方式，默认：left                               |
| maxWidth | Number | 否   | 绘制文本的最大宽度，文字长度超过该值会被压缩                 |

#### slots

| 名称    | 说明                               |
| :------ | :--------------------------------- |
| default | 自定义插槽，点击此区会触发绘图事件 |

#### 事件

| 名称        | 回调参数 | 说明                                 |
| ----------- | -------- | ------------------------------------ |
| canvasImage | url      | 绘制成功后返回的本地地址，H5为base64 |



#### 使用方式

若`page.json`中配置了`"easycom": true`，则无需`script`引入就可以使用，没有则需要引入。

1. 无slot：组件标签添加`ref`属性，采用父级调用子组件`createCanvas()`方法使用，见后文示例；
2. 有slot：slot区点击就会执行

#### 示例

```javascript
// js
data () {
    return {
			canvasUrl: '',
			lists: [
						{
							type: 'image',
							content: 'https://www.zhonglixunqing.cn/images/uniapp/1.jpg', 
							width: 200, 
							height: 100, 
							x: 50, 
							y: 20, 
						},
						{
							type: 'image',
							content: 'https://www.zhonglixunqing.cn/images/uniapp/2.jpg', 
							width: 80, 
							height: 80, 
							x: 20, 
							y: 200, 
							arc: false, 
							arcX: 0, 
							arcY: 0, 
							arcR: 0 
						},
						{
							type: 'text',
							content: '扫一扫，获取更多信息', 
							x: 120, 
							y: 250, 
							color: '#ff0000', 
							size: 10, 
							// maxWidth: 100, 
							// align: 'left', 
						},
						{
							type: 'rect',
							width: 1,
							height: 100,
							x: 0,
							y: 10,
							color: '#ff0000',
						},
						{
							type: 'image',
							content: 'https://www.zhonglixunqing.cn/images/uniapp/3.jpg', 
							width: 100, 
							height: 100, 
							x: 200, 
							y: 200, 
							arc: true, 
							arcX: 250, 
							arcY: 250, 
							arcR: 50 
						},
					]
    };
  },
  methods: {
		beginCanvas () {
			this.$refs.mosoweCanvasComponents.createCanvas();
		},
		_canvasImage (e) {
			this.canvasUrl = e;
		}
	}
```

插件外独立按钮触发：

```html
		<button type="default" @click="beginCanvas">开始绘图</button>
		<image :src="canvasUrl" mode="widthFix"></image>
		<mosowe-canvas-image 
			ref="mosoweCanvasComponents" 
			@canvasImage="_canvasImage" 
			:lists="lists" 
			height="300" 
			width="300"
			showPreview />
```

slot插槽触发：

```html
		<mosowe-canvas-image 
			:lists="lists" 
			height="300" 
			width="300"
			showPreview >
			<view class="in_btn">
				slot按钮的
			</view>
			</mosowe-canvas-image>
```

#### 预览地址

