/**
 * Class: setupProxy
 * Author: wufei
 * Date: 2019-06-11
 * Description:
 */

const {BASE_URL} = require('./utils/httpUrl')
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/baseURL', {
        target: BASE_URL,
        pathRewrite: {
            "^/baseURL": "/"
        }
    }));
    app.use(
        proxy("/fans/**", {
            target: "https://easy-mock.com/mock/5c0f31837214cf627b8d43f0/",
            changeOrigin: true
        })
    );
};