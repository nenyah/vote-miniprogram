import request from "@/utils/request"
import {ItemResponse} from "@/common/Item"

export interface ItemParams {
    pageNo?: number,
    activityId: number
}

export interface ItemCateParams extends ItemParams {
    categoryId: number
}

type PosterParams = {
    itemId: number
    page: string
    scene: string
}
export default {
    itemsByCate: (params: ItemCateParams): Promise<ItemResponse> =>
        request({
            url: `weixin/item`,
            data: {
                ...params,
            },
        })
    ,
    itemsAll: (params: ItemParams): Promise<ItemResponse> =>
        request({
            url: `weixin/item`,
            data: {
                ...params
            },
        })
    ,
    itemByCode: ({code = "001", activityId = -1}) => {
        return request({
            url: `weixin/item`,
            data: {
                code,
                activityId,
            },
        })
    },
    itemById: ({id = -1, activityId = -1}) => {
        return request({
            url: `weixin/item`,
            data: {
                id,
                activityId
            },
        })
    },
    itemByName: (name: string) => {
        return request({
            url: `weixin/item`,
            data: {
                name
            },
        })
    },
    getPoster: (params: PosterParams) => {
        return request({
            url: `weixin/share/url`,
            method: "POST",
            data: {
                ...params
            }
        })
    }
}