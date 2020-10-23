import { ItemResponse } from './../common/Item'
/*
 * @Description: 项目相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:50
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 15:28:59
 */
import request from '@/utils/request'

type PageNo = number
type PageSize = number
type Code = string
type Name = string
type ActivityId = number
type CategoryId = number | undefined

interface getItemsParams {
    pageNo?: PageNo
    pageSize?: PageSize
    code?: Code
    id?: number
    name?: Name
    activityId: ActivityId
    categoryId?: CategoryId
}

/**
 *
 * @param params getItemsParams
 */
export const getItems = (params: getItemsParams): Promise<ItemResponse> =>
    request({
        url: `weixin/item`,
        data: {
            ...params,
        },
    })
