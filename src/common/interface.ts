/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-09-11 16:32:30
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-11 16:49:01
 */
// 选手
export interface Iitem {
  id: number // 选手编号
  name: string // 选手名称
  img: string // 选手图片
  company?: string // 选手公司
  group: string // 选手分组
  vote: number // 当前票数
  rank: number // 当前排名
  diffLast: number // 比上一名差多少票
  desc: string // 选手简介
}
// 属性
export interface Iinfo {
  name: string // 属性名称
  value: number // 属性值
}
// 投票规则
export interface Irule {
  day: number // 一天可以投票最大次数
  item: number //一次可以投几人
}
// 活动
export interface Iactivate {
  id: number // 活动编号
  name: string //活动名称
  bannerImg: Array<string> //广告图片
  startTime: string //开始时间
  endTime: string //结束时间
  rule: Irule // 活动规则
  desc: string //活动描述
}
