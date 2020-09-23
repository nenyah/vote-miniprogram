/*
 * @description: mock数据
 * @Author: Steven
 * @Date: 2020-09-07 17:00:45
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-21 13:53:05
 */
import { Iactivity, Iinfo, Iitem } from "@/common/interface"
/**
 * 项目数据
 */
export const items: Array<Iitem> = [
  {
    id: 1,
    code: "001",
    name: "漂亮1号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    description:
      "这个98年音乐剧专业的好姑娘，虽首轮遗憾选定，在复活赛中却用她的桀骜与热烈，给总决赛现场观众留下动人心魄的一抹红。",
    stats: [
      {
        name: "当前票数",
        value: 250 * 1,
      },
      {
        name: "排名",
        value: 6,
      },
      {
        name: "距上一名",
        value: 250 * 2 - 250,
      },
    ],
  },
  {
    id: 2,
    code: "002",
    name: "漂亮2号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    description:
      "这个98年音乐剧专业的好姑娘，虽首轮遗憾选定，在复活赛中却用她的桀骜与热烈，给总决赛现场观众留下动人心魄的一抹红。",
    stats: [
      {
        name: "当前票数",
        value: 250 * 2,
      },
      {
        name: "排名",
        value: 5,
      },
      {
        name: "距上一名",
        value: 250 * 3 - 250 * 2,
      },
    ],
  },
  {
    id: 3,
    code: "003",
    name: "漂亮3号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    description:
      "这个98年音乐剧专业的好姑娘，虽首轮遗憾选定，在复活赛中却用她的桀骜与热烈，给总决赛现场观众留下动人心魄的一抹红。",
    stats: [
      {
        name: "当前票数",
        value: 250 * 3,
      },
      {
        name: "排名",
        value: 4,
      },
      {
        name: "距上一名",
        value: 250 * 4 - 250 * 3,
      },
    ],
  },
  {
    id: 4,
    code: "003",
    name: "漂亮4号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    description:
      "这个98年音乐剧专业的好姑娘，虽首轮遗憾选定，在复活赛中却用她的桀骜与热烈，给总决赛现场观众留下动人心魄的一抹红。",
    stats: [
      {
        name: "当前票数",
        value: 250 * 4,
      },
      {
        name: "排名",
        value: 3,
      },
      {
        name: "距上一名",
        value: 250 * 5 - 250 * 4,
      },
    ],
  },
  {
    id: 5,
    code: "005",
    name: "漂亮5号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    description:
      "这个98年音乐剧专业的好姑娘，虽首轮遗憾选定，在复活赛中却用她的桀骜与热烈，给总决赛现场观众留下动人心魄的一抹红。",
    stats: [
      {
        name: "当前票数",
        value: 250 * 5,
      },
      {
        name: "排名",
        value: 2,
      },
      {
        name: "距上一名",
        value: 250 * 6 - 250 * 5,
      },
    ],
  },
  {
    id: 6,
    code: "006",
    name: "漂亮6号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    description:
      "这个98年音乐剧专业的好姑娘，虽首轮遗憾选定，在复活赛中却用她的桀骜与热烈，给总决赛现场观众留下动人心魄的一抹红。",
    stats: [
      {
        name: "当前票数",
        value: 250 * 6,
      },
      {
        name: "排名",
        value: 1,
      },
      {
        name: "距上一名",
        value: 0,
      },
    ],
  },
]
/**
 * 活动数据
 */
export const activities: Array<Iactivity> = [
  {
    id: 0, // 活动编号
    name: "2020伊人如梦*婉美如你 | 伊婉明星脸 全国100强投票", //活动名称
    bannerImg: [
      "https://www.huotoupiao.com/assets/www/ActivityPc2/img/tem2.jpg",
    ], //广告图片
    startTime: "2020-10-15 01:00", //开始时间
    endTime: "2020-12-01 01:00", //结束时间
    rule: [
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
    ], // 活动规则
    description: `测试.`, //活动描述
    status: "ISCOMING",
    slogan: "2020伊人如梦*婉美如你",
    stats: [
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
    ], // 统计信息
  },
  {
    id: 1, // 活动编号
    name: "2020伊人如梦*婉美如你 | 伊婉明星医生 全国100强投票", //活动名称
    bannerImg: [
      "https://www.huotoupiao.com/assets/www/ActivityPc2/img/tem2.jpg",
    ], //广告图片
    startTime: "2020-09-15 00:00", //开始时间
    endTime: "2020-10-11 00:00", //结束时间
    rule: [
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
    ], // 活动规则
    description: `测试.`, //活动描述
    status: "ONGOING",
    slogan: "2020伊人如梦*婉美如你",
    stats: [
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
    ], // 统计信息
  },
  {
    id: 2, // 活动编号
    name: "2020伊人如梦*婉美如你 | 伊婉明星咨询师 全国100强投票", //活动名称
    bannerImg: [
      "https://www.huotoupiao.com/assets/www/ActivityPc2/img/tem2.jpg",
    ], //广告图片
    startTime: "2020-09-01 00:00", //开始时间
    endTime: "2020-09-15 00:00", //结束时间
    rule: [
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
    ], // 活动规则
    description: `测试.`, //活动描述
    status: "ENDED",
    slogan: "2020伊人如梦*婉美如你",
    stats: [
      {
        name: "参与人数",
        value: 100,
      },
      {
        name: "累计票数",
        value: 23000,
      },
      {
        name: "累计访问",
        value: 560000,
      },
    ], // 统计信息
  },
]
