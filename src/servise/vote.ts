/*
 * @Description: 投票相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:50
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-25 15:10:59
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
interface StatParams {
  pageNo: number
  pageSize?: number
  activityId?: number
  startDate?: string
  endDate?: string
}
/**
 * 历史投票数据明细
 * @param params StatParams
 */
export const getVoteHistory = (params: StatParams) => {
  return request({
    url: `${config}weixin/vote/history`,
    data: {
      ...params,
    },
  })
}
/**
 * 当前人投票统计数据
 */
export const getVoteStat = () => {
  return request({
    url: `${config}weixin/vote/stat`,
  })
}