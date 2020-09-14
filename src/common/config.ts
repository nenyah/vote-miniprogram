/*
 * @Description: 配置项
 * @Author: Steven
 * @Date: 2020-09-14 09:15:22
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-14 15:28:09
 */
import { Iinfo } from "./interface"
// 活动规则
export const rule: Array<Iinfo> = [
  {
    name: "每个微信号每天可以投",
    value: 3,
  },
  {
    name: "每天可为同一选手投",
    value: 1,
  },
  {
    name: "每天最少投票",
    value: 1,
  },
]
// 活动统计
export const activityStats: Array<Iinfo> = [
  {
    name: "参与人数",
    value: 0,
  },
  {
    name: "累计票数",
    value: 0,
  },
  {
    name: "累计访问",
    value: 0,
  },
]
// 选手统计
export const itemStats: Array<Iinfo> = [
  {
    name: "当前票数",
    value: 0,
  },
  {
    name: "排名",
    value: 0,
  },
  {
    name: "距上一名",
    value: 0,
  },
]
