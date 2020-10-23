/*
 * @Description: 
 * @Author: Steven
 * @Date: 2020-10-12 08:42:45
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 13:09:45
 */
import { Iinfo } from './interface'
// 选手返回接口
export interface ItemResponse {
    pageNo: number //页码
    pageSize: number //每页大小
    data: Iitem[] //选手内容
    totalCount: number //总数据量
}
// 选手内容接口
export interface Iitem {
    category?: Category
    id: number
    code: string
    name: string
    description: string
    company: string
    img: string
    feature: string
    play: string
    activityId: number
    stats: Iinfo[]
}

export interface Category {
    id: number
    pid: number
    name: string
    description: string
    activityId: number
    createBy: string
    createTime: string
    updateBy: string
    updateTime: string
}
