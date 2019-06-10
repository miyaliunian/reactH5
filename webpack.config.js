/**
 * Author: wufei
 * Date: 2019/6/6
 * Description:
 *      不是真实的 webpack 配置，仅为兼容 webstorm  代码跳转
 */

module.exports = {
    resolve: {
        alias: {
            '@': require('path').resolve(__dirname, 'src'),
            '@assets': require('path').resolve(__dirname, 'src/assets'),
            '@components': require('path').resolve(__dirname, 'src/components'),
            '@containers': require('path').resolve(__dirname, 'src/containers'),
            '@images': require('path').resolve(__dirname, 'src/images'),
            '@reduxs': require('path').resolve(__dirname, 'src/reduxs'),
            '@routes': require('path').resolve(__dirname, 'src/routes'),
            '@utils': require('path').resolve(__dirname, 'src/utils'),
        },
    },
};