/*
 * @Description: 登录相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:50
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-25 10:59:02
 */
import request from "@/utils/request"
import config from "@/common/config"
import { IglobalData } from '@/common/interface'

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

export const getCode = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      success: (res) => {
        resolve(res.code)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * 登录换取openid,uniondid,token
 * 文档： [https://www2.huadongbio.com:9004/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/WeixinLogin/weixinLogin](https://www2.huadongbio.com:9004/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/WeixinLogin/weixinLogin)
 * @param params LoginParams
 *
 */
export const checkUser = (params: String) => {
  return request({
    url: `${config}weixin/login`,
    method: "POST",
    data: params,
  })
}

export const login = async () => {
  let app = getApp()
  // 获取code
  let code = (await getCode()) as string
  // 获取openid
  let { data } = await checkUser(code)
  // 存入全局
  let globaldata = app.globalData as IglobalData
  globaldata.openid = data.openId
  globaldata.token = data.token
  globaldata.unionid = data.unionid
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
