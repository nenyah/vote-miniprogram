/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-09-29 16:31:47
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-22 15:59:46
 */
import { CategoryResponse } from './../common/interface'
import request from '@/utils/request'
import config from '@/common/config'
interface CateParams {
    activityId: number
    pid?: number
}
export const getCate = (params: CateParams): Promise<CategoryResponse[]> => {
    return request({
        url: `${config}weixin/item/category`,
        data: {
            ...params,
        },
    })
}
