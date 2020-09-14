/*
 * @Description: 活动相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:38
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-14 15:39:59
 */
import { Iactivity } from "@/common/interface"
import request from "@/utils/request"
/**
 * 获取所有活动
 * @param page 当前页
 */
export const getActivities = (page: number) => {
  return <Promise<Iactivity> | Promise<any>>request({
    url: "/activaties",
    data: {
      page,
    },
  })
}
/**
 * 获取指定活动信息
 * @param id 活动id
 */
export const getActivity = (id: number) => {
  return request({
    url: `/activities/${id}`,
  })
}
