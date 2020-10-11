export interface ActivityResponse {
    pageNo: number;
    pageSize: number;
    data: Datum[];
    totalCount: number;
}

export interface Datum {
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
