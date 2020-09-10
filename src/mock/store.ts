/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-09-07 17:00:45
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-10 13:04:26
 */
export interface Iitem {
  id: Number
  name: String
  img: String
  company: String
  group: String
  vote: Number
  rank: Number
  diffLast: Number
}
export interface Iinfo {
  name: String
  value: Number
}
export const items: Array<Iitem> = [
  {
    id: 1,
    name: "漂亮1号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    vote: 250,
    rank: 6,
    diffLast: 100,
  },
  {
    id: 2,
    name: "漂亮2号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    vote: 250 * 2,
    rank: 5,
    diffLast: 200,
  },
  {
    id: 3,
    name: "漂亮3号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    vote: 250 * 3,
    rank: 4,
    diffLast: 1000,
  },
  {
    id: 4,
    name: "漂亮4号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    vote: 250 * 4,
    rank: 3,
    diffLast: 10000,
  },
  {
    id: 5,
    name: "漂亮5号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    vote: 250 * 5,
    rank: 2,
    diffLast: 100,
  },
  {
    id: 6,
    name: "漂亮6号",
    img:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599552329628&di=6fb1ca2fcfdc93412997fb8c45a1fd76&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3070838336%2C607285885%26fm%3D214%26gp%3D0.jpg",
    company: "公司",
    group: "漂亮组",
    vote: 250 * 6,
    rank: 1,
    diffLast: 0,
  },
]
export const indexstats: Array<Iinfo> = [
  {
    name: "参赛选手",
    value: 100,
  },
  {
    name: "累计票数",
    value: 1678395,
  },
  {
    name: "累计访问",
    value: 45597802,
  },
]
export const detailstats: Array<Iinfo> = [
  {
    name: "当前票数",
    value: 23460,
  },
  {
    name: "排名",
    value: 24,
  },
  {
    name: "距上一名",
    value: 494,
  },
]
