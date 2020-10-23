/*
 * @Description: 
 * @Author: Steven
 * @Date: 2020-10-09 09:31:05
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 15:29:27
 */
import request from "@/utils/request"

type PosterParams = {
    itemId: number
    page: string
    scene: string
}
export const getPoster = (params: PosterParams) => {
    return request({
        url: `weixin/share/url`,
        method: "POST",
        data: {
            ...params
        }
    })
}