/*
 * @Description: 项目相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:50
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-21 14:41:14
 */
import request from "@/utils/request"
import config from "@/common/config"

type ItemId = number
type OpenId = string
interface Iparams {
  itemId: ItemId
  openId: OpenId
}
/**
 *
 * @param params Iparams
 */
export const handleVote = (params: Iparams) => {
  return request({
    url: `${config}weixin/vote`,
    method: "POST",
    data: {
      ...params,
    },
  })
}
