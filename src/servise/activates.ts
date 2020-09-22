/*
 * @Description: 活动相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:38
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-22 13:32:56
 */
import { Iactivity } from "@/common/interface"
import request from "@/utils/request"
import config from "@/common/config"
/**
 * 获取所有活动
 * @param page 当前页
 */
export const getActivities = (pageNo: number = 1) => {
  return <Promise<Iactivity> | Promise<any>>request({
    url: `${config}weixin/activity`,
    data: {
      pageNo,
      pageSize: 10,
    },
  })
}
export const putVisits = (activityId: number) => {
  return request({
    url: `${config}weixin/activity/visits`,
    method: "PUT",
    data: activityId,
  })
}
