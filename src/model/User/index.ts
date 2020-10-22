import {UserInfoResponse} from "@/common/interface"

export class User implements UserInfoResponse {
    avatarUrl: string
    city: string
    country: string
    createTime: string
    gender: string
    id: number
    language: string
    mobile: string
    nickName: string
    openId: string
    province: string
    unionId: string
    updateTime: string

    constructor(user = {} as UserInfoResponse) {
        const {avatarUrl, city, country, createTime, gender, id, language, mobile, nickName, openId, province, unionId, updateTime} = user
        this.avatarUrl = avatarUrl
        this.city = city
        this.country = country
        this.createTime = createTime
        this.gender = gender
        this.id = id
        this.language = language
        this.mobile = mobile
        this.nickName = nickName
        this.openId = openId
        this.province = province
        this.unionId = unionId
        this.updateTime = updateTime
    }
}