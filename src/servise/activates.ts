/*
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-14 15:04:38
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 15:28:40
 */
import request from "@/utils/request"

/**
 * 获取所有活动
 * @param page 当前页
 */
export const getActivities = (pageNo: number = 1) => {
    return request({
        url: `weixin/activity`,
        data: {
            pageNo,
            pageSize: 10,
        },
    })
}
export const putVisits = (activityId: number) => {
    return request({
        url: `weixin/visit`,
        method: "POST",
        data: activityId,
    })
}
