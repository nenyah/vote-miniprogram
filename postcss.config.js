/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-08-26 16:08:15
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-09 09:20:43
 */
const path = require("path")
module.exports = {
  parser: require("postcss-comment"),
  plugins: [
    require("tailwindcss")("./tailwind.config.js"),
    require("postcss-import")({
      resolve(id, basedir, importOptions) {
        if (id.startsWith("~@/")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
        } else if (id.startsWith("@/")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
        } else if (id.startsWith("/") && !id.startsWith("//")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
        }
        return id
      },
    }),
    require("autoprefixer")({
      remove: process.env.UNI_PLATFORM !== "h5",
    }),
    require("@dcloudio/vue-cli-plugin-uni/packages/postcss"),
  ],
}
