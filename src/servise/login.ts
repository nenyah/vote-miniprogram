/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-09-21 16:40:29
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 15:29:19
 */
import { LoginResponse, UserInfoResponse } from './../common/interface'
import request from '@/utils/request'
import { IglobalData } from '@/common/interface'

type Code = string
type Signature = string
type EncryptedData = string
type IV = string
export interface UserParams {
    signature: Signature
    encryptedData: EncryptedData
    iv: IV
}

export const getCode = () =>
    new Promise((resolve, reject) => {
        uni.login({
            success: (res) => {
                resolve(res.code)
            },
            fail: (err) => {
                reject(err)
            },
        })
    })
/**
 * 登录换取openid,uniondid,token
 * @param params LoginParams
 *
 */
export const wxLogin = (params: Code): Promise<LoginResponse> =>
    request({
        url: `weixin/login`,
        method: 'POST',
        data: params,
    })

export const login = async () => {
    let app = getApp()
    // 获取code
    const [err, res]: any = await uni.login({ provider: 'sinaweibo' })
    console.log('res:::', res)
    // let code = (await getCode()) as string
    // console.log('获取到code', code)

    // 获取openid
    const userinfo = await wxLogin(res.code)
    // // 存入全局
    let globaldata = app.globalData as IglobalData
    globaldata.openid = userinfo.openId
    globaldata.token = userinfo.token
    globaldata.unionid = userinfo.unionId
}

/**
 * 上传用户信息
 * @param params UserParams
 */
export const userInfo = (params: UserParams): Promise<UserInfoResponse> => {
    return request({
        url: `weixin/user`,
        data: {
            ...params,
        },
    })
}
