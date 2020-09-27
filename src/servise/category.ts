import request from "@/utils/request"
import config from "@/common/config"
interface CateParams {
  activityId: number
  pid?: number
}
export const getCate = (params: CateParams) => {
  return request({
    url: `${config}weixin/item/category`,
    data: {
      ...params,
    },
  })
}
