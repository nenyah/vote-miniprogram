/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-09-11 16:32:30
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-27 10:24:24
 */

// 属性
export interface Iinfo {
  // 属性名称
  name: string
  // 属性值
  value: number
}

// 选手
export interface Iitem {
  // 选手数据编号
  id: number
  // 选手编号
  code: string
  // 选手名称
  name: string
  // 选手图片
  img: string
  // 选手公司
  company?: string
  // 选手分组
  group?: string
  // 选手风采
  show?: string
  // 选手简介
  description: string
  // 统计信息
  stats: Iinfo[]
}

// 活动
export interface Iactivity {
  // 活动编号
  id: number
  //活动名称
  name: string
  //广告图片
  bannerImg: string[]
  //开始时间
  startTime: string
  //结束时间
  endTime: string
  // 活动规则
  rule: Iinfo[]
  //活动描述
  description: string
  // 活动状态
  status: "ONGOING" | "ENDED" | "ISCOMING"
  // 口号，标语
  slogan: string
  // 统计信息
  stats: Iinfo[]
}
// 全局数据
export interface IglobalData {
  baseurl: string
  activities: Iactivity[]
  currentActId: number
  items: Iitem[]
  currentItemId: number
  openid: string
  token?:string
  unionid?:string
}