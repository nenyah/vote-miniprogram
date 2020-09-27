/*
 * @Description: 投票相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:50
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-27 10:27:15
 */
import request from "@/utils/request"
import config from "@/common/config"

type OpenId = string
/**
 *
 * @param itemId number
 */
export const handleVote = (itemId: number) => {
  return request({
    url: `${config}weixin/vote`,
    method: "POST",
    data: itemId,
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
