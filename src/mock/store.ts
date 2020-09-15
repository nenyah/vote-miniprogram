/*
 * @Description: mock数据
 * @Author: Steven
 * @Date: 2020-09-07 17:00:45
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-15 10:27:09
 */
import { Iactivity, Iinfo, Iitem } from "@/common/interface"
/**
 * 项目数据
 */
export const items: Array<Iitem> = [
  {
    id: 1,
    name: "漂亮1号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    desc:
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
    name: "漂亮2号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    desc:
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
    name: "漂亮3号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    desc:
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
    name: "漂亮4号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    desc:
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
    name: "漂亮5号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    desc:
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
    name: "漂亮6号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    desc:
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
    startTime: "2020-10-15 00:00", //开始时间
    endTime: "2020-12-01 00:00", //结束时间
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
    desc: `2019，怎样才能在众多商户中脱颖而出?家家传媒给大家送福利来了!不管您经营的是餐饮、酒店、休闲娱乐，钻石珠宝,家装建材，婚庆影楼，还是家电数码，母婴，商行超市，农资特产，教育培训，品牌服务，广告设计，微店，制作业等……，只要您是石脑镇的商家，均可报名！我们的目的只有一个，利用互联网各种线上宣传形式，为商家推广，营销制作人气，提高市场关注度，增加商家的进店曝光率！温馨提示
      每个微信号每天可投3票，给同一选手一天限投一票。本活动重在参与，意在宣传推广，我们不提倡赠送礼物，赠送礼物属自愿行为，如有疑问请联系我们的在线客服奖项设置关于作弊
      活动方有权对票数异常的选手做出相应处罚，作弊违规行为包括但不限于：使用辅助软件的作弊行为、网上买僵尸号的投票行为、找投票公司付费投票行为。第一次电话口头警告并减去相关的票数，第二次再出现类似情况，不再另行通知，票数系统将自动清零，严重者取消参评资格和获奖资格。
      活动重在参与，意在宣传推广，打赏属自愿行为，我们不提倡给选手打赏，请酌情购买，主办方对本活动保留最终解释权！.`, //活动描述
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
    id: 1, // 活动编号
    name: "2020伊人如梦*婉美如你 | 伊婉明星医生 全国100强投票", //活动名称
    bannerImg: [
      "https://www.huotoupiao.com/assets/www/ActivityPc2/img/tem2.jpg",
    ], //广告图片
    startTime: "2020-10-15 00:00", //开始时间
    endTime: "2020-12-01 00:00", //结束时间
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
    desc: `2019，怎样才能在众多商户中脱颖而出?家家传媒给大家送福利来了!不管您经营的是餐饮、酒店、休闲娱乐，钻石珠宝,家装建材，婚庆影楼，还是家电数码，母婴，商行超市，农资特产，教育培训，品牌服务，广告设计，微店，制作业等……，只要您是石脑镇的商家，均可报名！我们的目的只有一个，利用互联网各种线上宣传形式，为商家推广，营销制作人气，提高市场关注度，增加商家的进店曝光率！温馨提示
      每个微信号每天可投3票，给同一选手一天限投一票。本活动重在参与，意在宣传推广，我们不提倡赠送礼物，赠送礼物属自愿行为，如有疑问请联系我们的在线客服奖项设置关于作弊
      活动方有权对票数异常的选手做出相应处罚，作弊违规行为包括但不限于：使用辅助软件的作弊行为、网上买僵尸号的投票行为、找投票公司付费投票行为。第一次电话口头警告并减去相关的票数，第二次再出现类似情况，不再另行通知，票数系统将自动清零，严重者取消参评资格和获奖资格。
      活动重在参与，意在宣传推广，打赏属自愿行为，我们不提倡给选手打赏，请酌情购买，主办方对本活动保留最终解释权！.`, //活动描述
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
]
