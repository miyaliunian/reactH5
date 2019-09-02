/**
 * Class: setupProxy
 * Author: wufei
 * Date: 2019-06-11
 * Description:
 */


const BASE_URL = 'http://61.132.94.72:10086/t-core/'
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