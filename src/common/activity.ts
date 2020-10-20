import { Iinfo } from './interface'
// 活动返回接口
export interface ActivityResponse {
    pageNo: number
    pageSize: number
    data: Iactivity[]
    totalCount: number
}
// 活动内容
export interface Iactivity {
    id: number
    name: string
    theme: string
    description: string
    startTime: string
    endTime: string
    status: string
    bannerImg: string[]
    rule: Iinfo[]
    statistics: Iinfo[]
}
