/*
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-21 14:36:58
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 15:30:02
 */
import { HistoryResponse, StatResponse } from './../common/interface'
import request from '@/utils/request'

type OpenId = string
/**
 *
 * @param itemId number
 */
export const handleVote = (itemId: number) => {
    return request({
        url: `weixin/vote`,
        method: 'POST',
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
export const getVoteHistory = (
    params: StatParams
): Promise<HistoryResponse> => {
    return request({
        url: `weixin/vote/history`,
        data: {
            ...params,
        },
    })
}
/**
 * 当前人投票统计数据
 */
export const getVoteStat = (): Promise<StatResponse[]> => {
    return request({
        url: `weixin/vote/stat`,
    })
}
