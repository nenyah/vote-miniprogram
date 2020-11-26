export const appConfig = {
    tokenKey: 'Authorization',
    apiUrl:
        process.env.NODE_ENV !== 'production'
            ? 'https://tp.huadongbio.com:9004/'
            : 'https://tp.huadongbio.com:9004/',
}
