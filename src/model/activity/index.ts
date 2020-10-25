import {Iactivity} from "@/common/activity"
import {Iinfo} from "@/common/interface"

export class Activity implements Iactivity {
    id: number
    name: string
    theme: string
    description: string
    startTime: string
    endTime: string
    status: string
    bannerImg: string[]
    rule: Iinfo[]
    stats: Iinfo[]

    constructor(activity = {} as Iactivity) {
        const {id, name, theme, description, startTime, endTime, status, bannerImg, rule, stats} = activity
        this.id = id
        this.name = name
        this.theme = theme
        this.description = description
        this.startTime = startTime
        this.endTime = endTime
        this.status = status
        this.bannerImg = bannerImg
        this.rule = rule
        this.stats = stats

    }
}