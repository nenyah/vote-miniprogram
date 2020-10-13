export interface ItemResponse {
    pageNo: number;
    pageSize: number;
    data: Iitem[];
    totalCount: number;
}

export interface Iitem {
    category: Category;
    id: number;
    code: string;
    name: string;
    description: string;
    company: string;
    img: string;
    feature: string;
    play: string;
    activityId: number;
    stats: Stat[];
}

export interface Category {
    id: number;
    pid: number;
    name: string;
    description: string;
    activityId: number;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
}

export interface Stat {
    name: string;
    value: string;
}