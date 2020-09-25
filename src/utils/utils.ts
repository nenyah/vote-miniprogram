
export const getUserInfo = ()=>{
    return new Promise((resolve, reject) => {
        uni.getUserInfo({
            provider:"weixin",
            success:res=>{
                resolve(res)
            },
            fail:err=>{
                reject(err)
            }
        })
    )
}