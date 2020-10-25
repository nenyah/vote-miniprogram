/*
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-11 16:32:30
 * @LastEditors: Steven
 * @LastEditTime: 2020-10-23 16:30:02
 */
import {Iactivity} from "./activity"
import {Iitem} from "@/common/Item"

export interface Iinfo {
    name: string
    value: string
}

// 全局数据
export interface IglobalData {
    // 根url
    baseurl: string
    // 活动信息
    activities: Iactivity[]
    // 当前活动
    currentActId: number
    // 选手信息
    items: Iitem[]
    // 当前选手
    currentItemId: number
    // openid
    openid: string
    // token
    token?: string
    // unionid
    unionid?: string
}

// 用户信息返回接口
export interface UserInfoResponse {
    id: number
    mobile: string
    unionId: string
    openId: string
    nickName: string
    gender: string
    language: string
    city: string
    province: string
    country: string
    avatarUrl: string
    createTime: string
    updateTime: string
}

// 微信登录返回接口
export interface LoginResponse {
    token: string
    openId: string
    unionId: string
    userInfo: UserInfoResponse
}

export interface StatResponse {
    activityId: number
    activityName: string
    voteCount: number
}


export interface CategoryResponse {
    children: null[]
    activity: Iactivity
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

export interface HistoryResponse {
    pageNo: number
    pageSize: number
    data: Datum[]
    totalCount: number
}

export interface Datum {
    date: string
    records: Record[]
}

export interface Record {
    id: number
    code: string
    name: string
    img: string
    voteTime: string
    activityId: number
    activityName: string
}
