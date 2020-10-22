import {Iinfo} from "@/common/interface"
import {Category, Iitem} from "@/common/Item"


export class Item implements Iitem {
    category: Category
    id: number
    code: string
    name: string
    description: string
    company: string
    img: string
    feature: string
    play: string
    activityId: number
    stats: Iinfo[]

    constructor(item = {} as Iitem) {
        const {category, id, code, name, description, company, img, feature, play, activityId, stats} = item
        this.category = category
        this.id = id
        this.code = code
        this.name = name
        this.description = description
        this.company = company
        this.img = img
        this.feature = feature
        this.play = play
        this.activityId = activityId
        this.stats = stats
    }
}