/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description:
 *  按需加载
 */

const {override, fixBabelImports,addLessLoader} = require('customize-cra');
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
                viewportWidth: 375, // (Number) The width of the viewport.
                viewportHeight: 667, // (Number) The height of the viewport.
                unitPrecision: 2, // (Number) The decimal numbers to allow the REM units to grow to.
                viewportUnit: 'vw', // (String) Expected units.
                selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
                minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                mediaQuery: false // (Boolean) Allow px to be converted in media queries.
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



module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        //下面这行很特殊，这里是更改主题的关键，这里我只更改了主色，当然还可以更改其他的，下面会详细写出。
        modifyVars: { "@primary-color": "#f47983"}
    }),
    addCustomize(),
);
