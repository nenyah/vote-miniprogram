export interface ActivityResponse {
    pageNo: number;
    pageSize: number;
    data: Iactivity[];
    totalCount: number;
}

export interface Iactivity {
    id: number;
    name: string;
    theme: string;
    description: string;
    startTime: string;
    endTime: string;
    status: string;
    "bannerImg[]": string[];
    rule: Rule[];
    statistics: Rule[];
}

export interface Rule {
    name: string;
    value: string;
}
