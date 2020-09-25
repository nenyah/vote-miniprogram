export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      provider: "weixin",
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

export const getStorage = (key: string) => {
  return new Promise((resolve, reject) => {
    uni.getStorage({
      key: key,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

export const setStorage = async (key: string, data: Object) => {
  return new Promise((resolve, reject) => {
    uni.setStorage({
      key: key,
      data: data,
      success: (res) => {resolve(res)},
      fail: (err) => {reject(err)},
    })
  })
}
