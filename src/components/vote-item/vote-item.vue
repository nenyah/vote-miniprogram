<template>
  <view
      class="flex flex-col flex-1 text-center justify-center border border-solid border-gray-600 bg-theme-gradient m-1 p-2 border-img"
      :class="customWidth"
  >
    <view class="text-theme-1 my-1">{{ item.code }} 号</view>
    <navigator v-if="index" :url="toUrl">
      <image
          :src="item.img"
          mode="scaleToFill"
          style="width: 100%; height:20vh; background-color: #eeeeee;"
      ></image>
      <view class="text-gray-100 text-lg font-bold mt-1">{{ item.name }}</view>
      <view class="text-theme-1 my-1">{{ item.category.name }}</view>
      <view class="text-theme-1 my-1">{{ item.company }}</view>
    </navigator>
    <view v-else>
      <image
          :src="item.img"
          mode="widthFix"
          style="width: 100%; background-color: #eeeeee;"
      ></image>

      <view class="text-gray-100 text-lg font-bold mt-1">{{ item.name }}</view>
      <view class="text-theme-1 my-1">{{ item.category.name }}</view>
      <view class="text-theme-1 my-1">{{ item.company }}</view>
    </view>
    <view v-if="index">
      <view class="flex w-full">
        <view
            class="flex-1 border border-solid border-gray-500 bg-theme-p-5 text-white p-2"
        >{{ item.stats[0].value }}
        </view
        >
        <view
            class="flex-1 border border-solid border-orange-500 bg-orange-500 text-white p-2"
            @click="vote"
        >
          投票
        </view>
      </view>
      <view class="my-1 p-2 border border-solid"
            @click="share"
      >帮我拉票
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue"
import {handleVote} from "@/servise/vote"
import {login} from "@/servise/login"
import {isAuthorize, isFollower, isLogin, isValidTime} from "@/utils/check"

export default Vue.extend({
  components: {
  },
  data() {
    return {
      actId: -1 as number,
      mark: false,
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
  mounted() {
    const app = getApp()
    this.actId = app.globalData?.currentActId as number
  },
  methods: {
    async share() {
      console.log("share:::")
      // this.$store.commit("toggleModal")
      await this.$store.dispatch("share", {itemId: this.item.id, actId: this.actId})
    },
    async vote() {
      /**
       * 1. 判断是否关注公众号
       * 2. 判断是否在投票时间 本地判断
       * 3. 判断是否超出限制 服务器判断
       *
       */
      // 判断是否是进行中的活动，不是就直接返回
      if (!isValidTime()) {
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
              content: "你还没有登录",
              cancelText: "暂不登录",
              confirmText: "马上登录",
              success: async (res) => {
                console.log("登录同意后信息", res)
                if (res.cancel === true) {
                  return
                }
                uni.navigateTo({
                  url: `../login/login`,
                })
              },
            })
            return
          }

          // 判断是否关注了公众号
          if (!isFollower()) {
            uni.showModal({
              content: "请先关注公众号《YVOIRE伊婉》再投票哦！",
              showCancel: false,
            })
            return
          }

          // 没有openid
          if (isLogin()) {
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
  },
  computed: {
    toUrl(): string {
      return `/pages/detail/detail?id=${this.item.id}`
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

.bg-theme-gradient {
  background: linear-gradient(to bottom right, #aee5e8, #86c6cf);
}
</style>
