import request from "@/utils/request"
import {CategoryResponse} from "@/common/interface"

export interface CateParams {
    activityId: number
    pid?: number
}

export default {
    categories: (params: CateParams): Promise<CategoryResponse[]> => {
        return request({
            url: `weixin/item/category`,
            data: {
                ...params,
            },
        })
    }
}