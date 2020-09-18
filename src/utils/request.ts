/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-09-11 08:52:11
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-18 15:05:57
 */
interface IParams {
  url: string
  method?: "GET" | "POST"
  setUpUrl?: boolean
  data?: any
}

export default (params: IParams) => {
  // 加载中
  uni.showLoading({
    title: "加载中",
  })
  return new Promise(
    (resolve: (value: any) => void, reject: (value: any) => void) => {
      console.log(`正在请求：${params.url}`)

      uni.request({
        ...params,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        },
        complete() {
          uni.hideLoading()
        },
      })
    }
  )
}
