/*
 * @Description: 项目相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:50
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-14 15:20:50
 */
import request from "@/utils/request"
/**
 * 获取所有项目
 * @param page 当前页
 */
export const getItems = (page: number) => {
  return request({
    url: "/items",
    data: {
      page,
    },
  })
}
/**
 * 获取指定id项目
 * @param id 项目id
 */
export const getItem = (id: number) => {
  return request({
    url: `/items/${id}`,
  })
}
