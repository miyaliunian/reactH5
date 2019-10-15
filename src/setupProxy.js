/**
 * Class: setupProxy
 * Author: wufei
 * Date: 2019-06-11
 * Description:
 */

//常州
// const BASE_URL = 'http://app.czrsj.cn:10086/t-core'

//南通厕所
// const BASE_URL = 'http://58.208.84.112:10086/t-core'
//南通正式
const BASE_URL = 'http://www.ntyibao.com/t-core'
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/baseURL', {
        target: BASE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/baseURL": "/"
        }
    }));
};
