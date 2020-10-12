<template>
  <view class="bg-theme-p-1">
    <!-- 标题 -->
    <title :content="activity.name"></title>
    <!-- 统计票数 -->
    <stats :content="item.stats" :isDetail="true">
      <view
          class="text-2xl text-gray-100 font-bold text-center mt-4 border border-solid border-gray-200 p-2 inline-flex bg-orange-500"
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
    <sub-title v-if="item.play !== undefined" :content="title2"></sub-title>
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
    <modal :src="canvasUrl" v-show="showModal" @hide="hide"></modal>
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
import {items} from "@/mock/store"
import {Iactivity, IglobalData, Iitem} from "@/common/interface"
import {getItems} from "@/servise/items"
import {handleVote} from "@/servise/vote"
import {login} from "@/servise/login"
import * as _ from "lodash"
import {isAuthorize} from "@/utils/check"
import {getPoster} from "@/servise/share"
import {getActivities} from "@/servise/activates"

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
      showModal: false,
    }
  },
  async onLoad(query) {

    const scene = decodeURIComponent(query?.scene)
    console.log("scene:::", scene)
    const globalData = getApp().globalData as IglobalData
    if (scene == "undefined") {
      console.log("enter undefined:::")
      this.id = query?.id
      // 保存活动id
      this.actId = globalData.currentActId || 14
    } else {
      console.log("enter scene:::")
      // 后端登录
      await login()
      this.id = Number(scene.split("&")[0].split("=")[1])
      this.actId = Number(scene.split("&")[1].split("=")[1])
    }
    if (globalData.activities.length > 0) {
      this.activity = globalData.activities.filter((activity: Iactivity) => activity.id == this.actId)[0]
    } else {
      const {data} = await getActivities()
      this.activity = data.data.filter((activity: Iactivity) => activity.id == this.actId)[0]
    }

    // 筛选item
    await this._getItem()
    // 设置标题
    uni.setNavigationBarTitle({
      title: `我是${this.item.code}号，${this.item?.name}, 正在参加${this.activity.name}`,
    })
  },
  components: {
    title,
    stats,
    voteItem,
    voteFooter,
    subTitle,
    detailVideo,
  },
  methods: {
    async vote() {
      /**
       * 1. 判断是否关注公众号
       * 2. 判断是否在投票时间 本地判断
       * 3. 判断是否超出限制 服务器判断
       *
       */
      let {openid, unionid} = getApp()
          .globalData as IglobalData
      let {status} = this.activity
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
            let {data} = await handleVote(this.item.id)
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
                uni.$emit("update", {msg: "页面更新"})
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
          id = this.id
      try {
        let {data} = await getItems({activityId, id})

        this.item = data?.data[0]
      } catch (error) {
        console.error("远程获取数据错误")

        this.item = items.filter((el) => el.id == id)[0]
      }
    },
    hide() {
      console.log("parent receive:::")
      this.showModal = false
    },
    // 生成分享海报
    async share() {
      console.log("帮我拉票")
      try {
        let res = await getPoster({
          itemId: this.item.id,
          page: "pages/detail/detail",
          scene: `id=${this.item.id}&actId=${this.actId}`
        })
        console.log("res:::", res)
        //  成功后，预览
        // uni.previewImage({
        //   urls: [res.data]
        // })
        this.showModal = true
        this.canvasUrl = res.data
      } catch (e) {
        console.error("err:::", e)
      }
    },
  },
})
</script>

<style></style>
