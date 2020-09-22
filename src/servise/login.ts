/*
 * @Description: 登录相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:50
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-22 14:43:10
 */
import request from "@/utils/request"
import config from "@/common/config"

type Code = string
interface LoginParams {
  code: Code
}
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
 * 登录
 * @param params LoginParams
 */
export const login = (params: LoginParams) => {
  return request({
    url: `${config}weixin/login`,
    data: {
      ...params,
    },
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
