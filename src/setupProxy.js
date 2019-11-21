/**
 * Class: setupProxy
 * Author: wufei
 * Date: 2019-06-11
 * Description:
 */

//常州
// const BASE_URL = 'http://app.czrsj.cn:10086/t-core'
//南通正式
// const BASE_URL = "http://www.ntyibao.com/t-core";
//常州正式
// const BASE_URL = 'http://app.czrsj.cn:10086/t-core'
//    洛阳
const BASE_URL = "http://ykt.haly12333.org.cn:80/t-core";

const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/baseURL", {
      target: BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/baseURL": "/"
      }
    })
  );
};
