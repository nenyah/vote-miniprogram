/*
 * @Description: 登录相关业务
 * @Author: Steven
 * @Date: 2020-09-14 15:04:50
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-21 16:42:03
 */
import request from "@/utils/request"
import config from "@/common/config"

type Code = string
interface Iparams {
  code: Code
}
/**
 *
 * @param params Iparams
 */
export const login = (params: Iparams) => {
  return request({
    url: `${config}weixin/login`,
    data: {
      ...params,
    },
  })
}
