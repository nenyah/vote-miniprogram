/*
 * @Description: 项目相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:50
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-29 15:18:06
 */
import request from "@/utils/request"
import config from "@/common/config"

type PageNo = number
type PageSize = number
type Code = string
type Name = string
type ActivityId = number
type CategoryId = number | undefined

interface Iparams {
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
 * @param params Iparams
 */
export const getItems = (params: Iparams) => {
    return request({
        url: `${config}weixin/item`,
        data: {
            ...params,
        },
    })
}
