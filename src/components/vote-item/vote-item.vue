<template>
  <view
    class="flex flex-col flex-1 text-center justify-center border border-solid border-gray-600 bg-purple-100 m-2 p-2 border-img"
    :class="customWidth"
  >
    <view class="text-gray-500 my-1">{{ item.code }} 号</view>
    <navigator v-if="index" :url="toUrl">
      <image
        :src="item.img"
        mode="scaleToFill"
        style="width: 100%; height:20vh; background-color: #eeeeee;"
      ></image>
      <view class="text-gray-100 text-lg font-bold mt-1">{{ item.name }}</view>
      <view class="text-gray-500 my-1">{{ item.group }}</view>
    </navigator>
    <view v-else>
      <image
        :src="item.img"
        mode="widthFix"
        style="width: 100%; background-color: #eeeeee;"
      ></image>

      <view class="text-gray-100 text-lg font-bold mt-1">{{ item.name }}</view>
      <view class="text-gray-500 my-1">{{ item.group }}</view>
    </view>
    <view v-if="index">
      <view class="flex w-full">
        <view
          class="flex-1 border border-solid border-gray-500 bg-purple-300 text-white p-2"
          >{{ item.stats[0].value }}</view
        >
        <vote-button>
          <view
            class="flex-1 border border-solid border-orange-500 bg-orange-500 text-white p-2"
            @click="vote"
          >
            投票
          </view>
        </vote-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import voteButton from "@/components/vote-button/vote-button.vue"
import { handleVote } from "@/servise/vote"
import { Iactivity, IglobalData } from "@/common/interface"
import { login } from "@/servise/login"
import * as _ from "lodash"
import { isAuthorize } from "@/utils/check"
let app = getApp()
export default Vue.extend({
  components: {
    voteButton,
  },
  data() {
    return {
      actId: -1 as number,
    }
  },
  props: {
    item: Object,
    index: Boolean,
    col: {
      type: Number,
      default: 1,
    },
  },
  onLoad() {},
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
            uni.showToast({
              title: "请先关注公众号《YVOIRE伊婉》再投票哦！",
              icon: "none",
            })
            return
          }
          let { status } = activities.filter((el) => el.id == currentActId)[0]
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
              await login()
            } catch (err) {
              console.error("获取code失败", err)
            }
          }
          try {
            // 上传投票信息
            let { data } = await handleVote(this.item.id)
            console.log("上传之后", data)
            if (!(data.succes == "true")) {
              uni.showToast({
                title: data.errorMsg,
                icon: "none",
              })
              return
            }
            uni.showToast({
              title: "投票成功！",
              icon: "success",
            })
            setTimeout(() => {
              // 上传成功后刷新页面
              uni.$emit("update", { msg: "页面更新" })
            }, 2000)
          } catch (err) {
            console.error("上传投票信息失败", err)
          }
        },
      })
    },
  },
  computed: {
    toUrl(): string {
      return `/pages/detail/detail?code=${this.item.code}`
    },
    customWidth(): string {
      return `w-${64 / this.col}`
    },
  },
})
</script>

<style lang="scss" scoped>
.border-img {
  position: relative;
}

.border-img::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  background: $input-bg1-base64-code;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
}

.border-img::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  background: $input-bg2-base64-code;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
}
</style>
