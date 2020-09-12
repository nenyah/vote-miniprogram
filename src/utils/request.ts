export default (params: any) => {
  // 加载中
  uni.showLoading({
    title: "加载中",
  })
  return new Promise(
    (resolve: (value: any) => void, reject: (value: any) => void) => {
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
