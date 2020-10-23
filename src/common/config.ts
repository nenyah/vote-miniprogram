export const appConfig = {
    tokenKey: 'Authorization',
    apiUrl:
        process.env.NODE_ENV === 'prod'
            ? 'http://192.168.0.175:9003/'
            : 'https://tp.huadongbio.com:9004/',
}
