/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-09-29 16:31:47
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 15:28:50
 */
import { CategoryResponse } from './../common/interface'
import request from '@/utils/request'
interface CateParams {
    activityId: number
    pid?: number
}
export const getCate = (params: CateParams): Promise<CategoryResponse[]> => {
    return request({
        url: `weixin/item/category`,
        data: {
            ...params,
        },
    })
}
