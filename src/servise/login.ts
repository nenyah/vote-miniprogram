/*
 * @Description: 登录相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:50
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-24 16:21:16
 */
import request from "@/utils/request"
import config from "@/common/config"

type Code = string
type OpenId = string
type Signature = string
type EncryptedData = string
type IV = string
interface UserParams {
  openId: OpenId
  signature: Signature
  encryptedData: EncryptedData
  iv: IV
}

/**
 * 登录换取openid
 * 文档： [https://www2.huadongbio.com:9004/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/WeixinLogin/weixinLogin](https://www2.huadongbio.com:9004/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/WeixinLogin/weixinLogin)
 * @param params LoginParams
 *
 */
export const login = (params:String) => {
  return request({
    url: `${config}weixin/login`,
    method: "POST",
    data: params,
  })
}
/**
 * 上传用户信息
 * @param params UserParams
 */
export const userInfo = (params: UserParams) => {
  return request({
    url: `${config}weixin/user`,
    data: {
      ...params,
    },
  })
}

export const uLogin = () => {
  return new Promise(
    (resolve: (value: any) => void, reject: (value: any) => void) => {
      uni.login({
        provider: "weixin",
        success: (res) => resolve(res),
        fail: (err) => reject(err),
      })
    }
  )
}
