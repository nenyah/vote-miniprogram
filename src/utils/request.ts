/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-09-11 08:52:11
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 15:33:02
 */
import {token} from "./token"
import {appConfig} from "@/common/config"

interface IParams {
    url: string
    method?: "GET" | "POST" | "PUT"
    base_url?: boolean
    data?: any
}

interface Config {
    "Content-Type": string

    [x: string]: string
}
export default (params: IParams): Promise<any> => {
    // 加载中
    uni.showLoading({
        title: '加载中',
    })
    return new Promise((resolve, reject) => {
        
        let defaultParams = {
            timeout: 10000,
            ...params,
            url:
                (params.base_url ? params.base_url : appConfig.apiUrl) +
                params.url,
        }
        console.log(`正在请求：${defaultParams.url}`)
        uni.request({
            ...defaultParams,
            header: (() => {
                const tokenValue = token.get()
                let config: Config = {
                    'Content-Type': 'application/json',
                }
                if (tokenValue) {
                    config[appConfig.tokenKey] = tokenValue
                }
                return config
            })(),
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                reject(err)
            },
            complete() {
                uni.hideLoading()
            },
        })
    })
}
