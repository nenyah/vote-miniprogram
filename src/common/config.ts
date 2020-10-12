let url_config = ""
// development
if (process.env.NODE_ENV === "prod") {
    // 开发环境
    url_config = "http://192.168.0.175:9003/"
} else {
    // 生产环境
    url_config = "https://tp.huadongbio.com:9004/"
}

export default url_config