import request from "@/utils/request"
import config from "@/common/config"

type PosterParams = {
    itemId: number
    page: string
    scene: string
}
export const getPoster = (params: PosterParams) => {
    return request({
        url: `${config}weixin/share/url`,
        method: "POST",
        data: {
            ...params
        }
    })
}