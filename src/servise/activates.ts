/*
 * @Description: 活动相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:38
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-25 15:49:36
 */
import request from "@/utils/request"
import config from "@/common/config"

/**
 * 获取所有活动
 * @param page 当前页
 */
export const getActivities = (pageNo: number = 1) => {
    return request({
        url: `${config}weixin/activity`,
        data: {
            pageNo,
            pageSize: 10,
        },
    })
}
export const putVisits = (activityId: number) => {
    return request({
        url: `${config}weixin/visit`,
        method: "POST",
        data: activityId,
    })
}
