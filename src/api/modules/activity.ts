import request from "../../utils/request"
import {ActivityResponse} from "@/common/activity"

interface Activityparams {
    pageNo: number,
    pageSize: number
}

export default {
    activities: async (data: Activityparams = {pageNo: 1, pageSize: 10}): Promise<ActivityResponse> => {
        return request({
            url: `weixin/activity`,
            data,
        })
    },
    addVisits: (activityId: number): Promise<void> => {
        return request({
            url: `weixin/visit`,
            method: "POST",
            data: activityId,
        })
    },
}
