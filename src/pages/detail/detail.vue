<template>
  <view class="bg-purple">
    <!-- 标题 -->
    <title :content="activity.name"></title>
    <!-- 统计票数 -->
    <stats :content="item.stats" :isDetail="true">
      <view
        class="text-2xl text-gray-100 font-bold w-full text-center mt-4"
        @click="vote"
      >
        投票
      </view>
    </stats>
    <!-- 选手详情 -->
    <sub-title :content="title1"></sub-title>
    <!-- 选手图片 -->
    <view class="flex justify-center">
      <vote-item :item="item"></vote-item>
    </view>

    <!-- 风采展示 -->
    <sub-title v-if="item.paly !== undefined" :content="title2"></sub-title>
    <detail-video :src="item.play"></detail-video>
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
      <image :src="canvasUrl" mode="widthFix" style="width:0;height:0;"></image>
      <mosowe-canvas-image
        ref="mosoweCanvasComponents"
        @canvasImage="_canvasImage"
        :lists="lists"
        :height="400"
        :width="300"
        :showPreview="true"
      />
    </view>

    <!-- 返回 -->
    <navigator
      url="pages/index/index"
      open-type="navigateBack"
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
import { Iactivity, IglobalData, Iitem } from "@/common/interface"
import { getItems } from "@/servise/items"
import { handleVote } from "@/servise/vote"
import { login } from "@/servise/login"
import * as _ from "lodash"
import { isAuthorize } from "@/utils/check"
let app = getApp()
export default Vue.extend({
  data() {
    return {
      id: 0,
      code: "",
      actId: 0,
      activity: {} as Iactivity,
      width: 0,
      height: 0,
      item: <Iitem>{},
      title1: "选手详情",
      title2: "选手风采",
      title3: "选手简介",
      canvasUrl: "",
      lists: [
        {
          type: "image",
          content: "https://tp.huadongbio.com:9004/weixin/img/bg.jpg", // 图片url
          width: 300,
          height: 400,
          x: 0,
          y: 0,
          arc: false,
          arcX: 0,
          arcY: 0,
          arcR: 0,
        },
        {
          type: "text",
          content: "2020伊婉你最美",
          x: 150,
          y: 20,
          color: "#fff",
          size: 10,
          maxWidth: 100,
          align: "center",
        },
        {
          type: "text",
          content: "1 号",
          x: 150,
          y: 190,
          color: "#000",
          size: 20,
          maxWidth: 100,
          align: "center",
        },
        {
          type: "text",
          content: "漂亮组",
          x: 150,
          y: 220,
          color: "#000",
          size: 18,
          maxWidth: 100,
          align: "center",
        },
        {
          type: "qr",
          content: "https://www.zhonglixunqing.cn/images/uniapp/1.jpg",
          width: 100,
          height: 100,
          x: 100,
          y: 250,
          arc: false,
          arcX: 0,
          arcY: 0,
          arcR: 0,
        },
        {
          type: "image",
          content:
            "http://www2.huadongbio.com:9000/vote-app/2020-09-22/avatar.png",
          width: 110,
          height: 110,
          x: 100,
          y: 35,
          arc: true,
          arcX: 155,
          arcY: 90,
          arcR: 55,
        },
      ],
    }
  },
  async onLoad(query) {
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
    // 更新帮我拉新内容
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
    async vote() {
      /**
       * 1. 判断是否关注公众号
       * 2. 判断是否在投票时间 本地判断
       * 3. 判断是否超出限制 服务器判断
       *
       */
      let { openid, activities, currentActId, unionid } = getApp()
        .globalData as IglobalData
      this.actId = currentActId
      let { status } = activities.filter((el) => el.id == currentActId)[0]
      // 判断是否是进行中的活动，不是就直接返回
      if (!(status == "ONGOING")) {
        uni.showToast({
          title: "现在不是投票时间哦！",
          icon: "none",
        })
        return
      }
      uni.showModal({
        content: `确认为${this.item.code}号投票吗？`,
        success: async (res) => {
          // 取消按钮
          if (res.cancel == true) {
            return
          }
          // 判断是否授权
          let isLogined = await isAuthorize()
          if (!isLogined) {
            uni.showModal({
              content: "请先登录",
              showCancel: false,
              success: async (res) => {
                console.log("登录同意后信息", res)
                uni.navigateTo({
                  url: `../login/login`,
                })
              },
            })

            return
          }

          // 判断是否关注了公众号
          if (_.isEmpty(unionid)) {
            uni.showModal({
              content: "请先关注公众号《YVOIRE伊婉》再投票哦！",
              showCancel: false,
            })
            return
          }

          // 没有openid
          if (_.isEmpty(openid)) {
            try {
              await login()
            } catch (err) {
              console.error("获取code失败", err)
            }
          }
          try {
            // 上传投票信息
            let { data } = await handleVote(this.item.id)
            console.log("上传之后", data)
            if (data.success !== true) {
              uni.showModal({
                content: data.errorMsg,
                showCancel: false,
              })
              return
            }
            uni.showModal({
              content: "投票成功！",
              showCancel: false,
              success: (res) => {
                // 上传成功后刷新页面
                uni.$emit("update", { msg: "页面更新" })
              },
            })
          } catch (err) {
            console.error("上传投票信息失败", err)
          }
        },
      })
    },
    // 获取选手信息
    async _getItem() {
      let activityId = this.actId,
        code = this.code
      try {
        let { data } = await getItems({ activityId, code })

        this.item = data?.data[0]
      } catch (error) {
        console.error("远程获取数据错误")

        this.item = items.filter((el) => el.code == code)[0]
      }
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
  },
})
</script>

<style></style>
