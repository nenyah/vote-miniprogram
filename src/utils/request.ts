import { IglobalData } from '@/common/interface'

interface IParams {
    url: string
    method?: 'GET' | 'POST' | 'PUT'
    setUpUrl?: boolean
    data?: any
}

export default (params: IParams): Promise<any> => {
    // 加载中
    uni.showLoading({
        title: '加载中',
    })
    return new Promise((resolve, reject) => {
        console.log(`正在请求：${params.url}`)
        let defaultParams = {
            timeout: 10000,
            ...params,
        }
        uni.request({
            ...defaultParams,
            header: {
                Authorization:
                    (getApp().globalData as IglobalData).token || undefined,
            },
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                reject(err)
            },
            complete() {
                uni.hideLoading()
            },
        })
    })
}
