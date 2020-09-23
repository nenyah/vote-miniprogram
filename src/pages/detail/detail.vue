<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-08 08:48:06
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-22 16:56:36
-->
<template>
  <view class="bg-purple">
    <!-- 标题 -->
    <title :content="activity.name"></title>
    <!-- 统计票数 -->
    <stats :content="item.stats" :isDetail="true">
      <button
        class="text-2xl text-gray-100 font-bold w-full text-center mt-4"
        open-type="getUserInfo"
        @getuserinfo="getuserinfo"
        withCredentials="true"
        hover-class="none"
      >
        投票
      </button>
    </stats>
    <!-- 选手详情 -->
    <sub-title :content="title1"></sub-title>
    <!-- 选手图片 -->
    <view class="flex justify-center">
      <vote-item :item="item"></vote-item>
    </view>

    <!-- 风采展示 -->
    <sub-title v-if="item.show !== undefined" :content="title2"></sub-title>
    <detail-video></detail-video>
    <!-- 选手简介 -->
    <sub-title :content="title3"></sub-title>
    <view class="text-gray-100 p-4 text-center">{{ item.description }}</view>
    <!-- 帮我拉票 -->
    <view class="text-center">
      <view
        class="inline-block text-gray-100 text-xl my-2 p-2 border-r-0 border-l-0 border-t-0 border-b-2 border-solid border-orange-500"
        @click="share"
      >
        帮我拉票
      </view>
      <image :src="canvasUrl" mode="widthFix"></image>
      <mosowe-canvas-image
        ref="mosoweCanvasComponents"
        @canvasImage="_canvasImage"
        :lists="lists"
        height="400"
        width="300"
      />
    </view>

    <!-- 返回 -->
    <navigator
      :url="'/pages/index/index?id=' + actId"
      open-type="reLaunch"
      hover-class="other-navigator-hover"
    >
      <view class="text-center">
        <view
          class="inline-block text-gray-100 text-xl my-2 p-2 border-r-0 border-l-0 border-t-0 border-b-2 border-solid border-orange-500"
        >
          返回
        </view>
      </view>
    </navigator>
    <!-- 脚注 -->
    <vote-footer :content="activity.name"></vote-footer>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import title from "@/components/title/title.vue"
import stats from "@/components/stats/stats.vue"
import voteItem from "@/components/vote-item/vote-item.vue"
import voteFooter from "@/components/footer/footer.vue"
import subTitle from "@/components/sub-title/sub-title.vue"
import detailVideo from "@/components/detail-video/detail-video.vue"
import mosoweCanvasImage from "@/components/mosowe-canvas-image/mosowe-canvas-image.vue"
import { items } from "@/mock/store"
import { Iinfo, Iitem, Iactivity, IglobalData } from "@/common/interface"
import { getItems } from "@/servise/items"
import { handleVote } from "@/servise/vote"
import { login, uLogin } from "@/servise/login"
import * as _ from "lodash"
export default Vue.extend({
  data() {
    return {
      id: 0,
      code: "",
      actId: 0,
      activity: {} as Iactivity,
      item: <Iitem>{},
      title1: "选手详情",
      title2: "选手风采",
      title3: "选手简介",
      canvasUrl: {} as any,
      lists: [
        // 图片，图片有先后，叠加画图
        {
          type: "image",
          content: "https://tp.huadongbio.com:9004/weixin/img/bg.jpg", // 图片url
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
          content:
            "http://www2.huadongbio.com:9000/vote-app/2020-09-22/avatar.png", // 图片url
          width: 110, // 图片绘制宽度
          height: 110, // 图片绘制高度
          x: 100, // 图片绘制X轴位置
          y: 35, // 图片绘制Y轴位置
          arc: true, // 圆形
          arcX: 155, // 圆的x坐标
          arcY: 90, // 圆的y坐标
          arcR: 55, // 圆的半径
        },
      ],
    }
  },
  async onLoad(query) {
    // 打印参数
    console.log("传入参数:", query)
    // 保存活动id
    const globalData = getApp().globalData as IglobalData
    this.actId = globalData.currentActId
    this.code = query?.code
    this.activity = globalData.activities[this.actId]
    // 筛选item
    await this._getItem()
    // 设置标题
    uni.setNavigationBarTitle({
      title: `我是${this.code}号，${this.item?.name}, 正在参加${
        globalData.activities[this.actId].name
      }`,
    })
    // TODOS:更新帮我拉票内容
    // 更新名称
    this.lists[1].content = this.activity.name
    this.lists[2].content = this.item.code
    this.lists[3].content = this.item.group || ""
    this.lists[5].content = this.item.img
  },
  components: {
    title,
    stats,
    voteItem,
    voteFooter,
    subTitle,
    detailVideo,
    mosoweCanvasImage,
  },
  methods: {
    // 获取选手信息
    async _getItem() {
      let activityId = this.actId,
        code = this.code
      try {
        let { data } = await getItems({ activityId, code })
        console.log("获取到信息", data.data)

        this.item = data?.data[0]
      } catch (error) {
        console.error("远程获取数据错误")

        this.item = items.filter((el) => el.code == code)[0]
      }
    },
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

    // 生成分享海报
    share() {
      console.log("帮我拉票")
      let child: any = this.$refs.mosoweCanvasComponents
      child.createCanvas()
    },
    getuserinfo() {
      let id = this.item.id
      console.log("ID:", id)

      // 获取用户信息
      uni.getStorage({
        key: "userInfo",
        success: async (res) => {
          let { openid, activities, currentActId } = getApp()
            .globalData as IglobalData
          let { status } = activities.filter((el) => el.id == currentActId)[0]
          console.log("openid:", openid, "status:", status)
          // 判断是否是进行中的活动，不是就直接返回
          if (!(status == "ONGOING")) {
            uni.showToast({
              title: "现在不是投票时间哦！",
              icon: "none",
            })
            return
          }
          // 没有openid
          if (_.isEmpty(openid)) {
            try {
              let res = await uLogin()
              let { data } = await login({ code: res.code })
              openid = data.openId
              console.log(`code:${res.code}, openid:`, data.openId)
            } catch (err) {
              console.error("获取code失败", err)
            }
          }
          try {
            // 上传投票信息
            let { data } = await handleVote({
              itemId: this.item.id,
              openId: openid,
            })
            console.log("上传之后", data)
            if (data.success) {
              // 成功后显示投票成功并刷新数据
              uni.showToast({
                title: "投票成功！",
                icon: "success",
              })
              this._getItem()
            } else {
              // 失败后显示原因
              uni.showToast({
                title: data.errorMsg,
                icon: "none",
              })
            }
          } catch (err) {
            console.error("上传投票信息失败", err)
          }
        },
      })
    },
  },
})
</script>

<style></style>
