/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description:
 *   webpack 按需加载
 */

const { override, fixBabelImports, addWebpackAlias, addLessLoader, disableChunk } = require('customize-cra')
const theme = require('./package.json').theme
const path = require('path')

const addCustomize = () => config => {
    require('react-app-rewire-postcss')(config, {
        plugins: loader => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009'
                },
                stage: 3
            }),
            require('postcss-aspect-ratio-mini')({}),
            require('postcss-px-to-viewport')({
                viewportWidth: 375,
                viewportHeight: 667,
                unitPrecision: 2,
                viewportUnit: 'vw',
                selectorBlackList: ['.ignore', '.hairlines'],
                minPixelValue: 1,
                mediaQuery: false
            }),
            require('postcss-write-svg')({
                utf8: false
            }),
            require('postcss-viewport-units')({}),
            require('cssnano')(
                require('cssnano-preset-advanced')({
                    zindex: false,
                    autoprefixer: false
                })
            )
        ]
    })
    return config
}

// 关闭 sourcemap
process.env.GENERATE_SOURCEMAP = 'false'

module.exports = override(
    addWebpackAlias({
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@baseUI': path.resolve(__dirname, 'src/baseUI'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@containers': path.resolve(__dirname, 'src/containers'),
        '@reduxs': path.resolve(__dirname, 'src/reduxs'),
        '@routes': path.resolve(__dirname, 'src/routes'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@api': path.resolve(__dirname, 'src/api')
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
    disableChunk()
)
