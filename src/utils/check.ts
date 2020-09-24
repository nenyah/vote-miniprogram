import { objectToString } from "@vue/shared"

/**
 * 判断是否登录
 * 检查是否有用户缓存，有就是已经登录，没有就是没有登录
 */
export const isLogin = async () => {
  try {
    let res = (await uni.getSetting({})) as any
    return "scope.userInfo" in res[1].authSetting
  } catch (err) {
    return false
  }
}

export const isFollower = async (data: any) => {
  // 判断是否关注公众号
  return data?.unionid ? true : false
}
