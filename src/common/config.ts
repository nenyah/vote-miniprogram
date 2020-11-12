export const appConfig = {
    tokenKey: 'Authorization',
    apiUrl:
        process.env.NODE_ENV !== "production" ? "https://tp.huadongbio.com:9004/" : "http://192.168.14.196:9004/",
}
