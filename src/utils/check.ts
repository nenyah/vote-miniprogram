/**
 * 判断是否登录
 * 检查是否有用户缓存，有就是已经登录，没有就是没有登录
 */
export const isAuthorize = async () => {
  try {
    let res = (await uni.getSetting({})) as any
    return "scope.userInfo" in res[1].authSetting
  } catch (err) {
    return false
  }
}
/**
 * 判断是否关注公众号
 * @param data 全局数据
 */
export const isFollower = async (data: any) => {
  // 
  return data?.unionid ? true : false
}
