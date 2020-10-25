import {Iactivity} from "@/common/activity"
import {CategoryResponse} from "@/common/interface"

export default class Category implements CategoryResponse {
    activity: Iactivity
    activityId: number
    children: null[]
    createBy: string
    createTime: string
    description: string
    id: number
    name: string
    pid: number
    updateBy: string
    updateTime: string

    constructor(category = {} as CategoryResponse) {
        const {activity, activityId, children, createBy, createTime, description, id, name, pid, updateBy, updateTime} = category
        this.activity = activity
        this.activityId = activityId
        this.children = children
        this.createBy = createBy
        this.createTime = createTime
        this.description = description
        this.id = id
        this.name = name
        this.pid = pid
        this.updateBy = updateBy
        this.updateTime = updateTime
    }


}