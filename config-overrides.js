/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description:
 *   webpack 按需加载
 */

const {
    override,
    fixBabelImports,
    addWebpackAlias,
    addLessLoader,
} = require('customize-cra');
const addCustomize = () => config => {
    require('react-app-rewire-postcss')(config, {
        plugins: loader => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
            }),
            require('postcss-aspect-ratio-mini')({}),
            require('postcss-px-to-viewport')({
                viewportWidth: 375,
                viewportHeight: 667,
                unitPrecision: 3,
                viewportUnit: 'vw',
                selectorBlackList: ['.ignore', '.hairlines'],
                minPixelValue: 1,
                mediaQuery: false
            }),
            require('postcss-write-svg')({
                utf8: false
            }),
            require('postcss-viewport-units')({}),
            require('cssnano')({
                preset: "advanced",
                autoprefixer: false,
                "postcss-zindex": false
            })
        ]
    });
    return config;
}
const theme = require('./package.json').theme
const path = require('path')
module.exports = override(
    addWebpackAlias({
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@baseUI': path.resolve(__dirname, 'src/baseUI'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@containers': path.resolve(__dirname, 'src/containers'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@reduxs': path.resolve(__dirname, 'src/reduxs'),
        '@routes': path.resolve(__dirname, 'src/routes'),
        '@utils': path.resolve(__dirname, 'src/utils'),

    }),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: theme
    }),
    addCustomize(),
);
