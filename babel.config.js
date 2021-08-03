/*
 * @Author: SummerJay__
 * @Date: 2021-08-02 22:12:23
 * @LastEditTime: 2021-08-03 09:35:36
 * @LastEditors: your name
 * @Description:
 * @FilePath: \vue-shop\babel.config.js
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
