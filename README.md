#React WebApp：

#####React+React-Redux+Redux-Thunk+Ant-Mobile
##使用
* yarn
* yarn start
## IDE调试：WebStorm
* 添加debug配置 debug 的方式为:JavaScript Debug  
* 在url出填写 'http://localhost:3000/'
* yarn start 启动项目
* 点击虫子开启debug
##目录结构
````$xslt
    public：这个文件夹是静态文件 不会参与到打包
    src:
       |-----------------------assets:                    
                                 |---------------- less             公共样式文件夹 
                                 |---------------- static           静态资源                                              
       |-----------------------components:                          公共组件
       |-----------------------containers:                          业务组件文件夹
       |-----------------------images:                              图片资源
       |-----------------------reduxs:                              Redux统一状态管理
                                 |---------------- middeleware      中间件 
                                 |---------------- modules          业务模块redux
       |-----------------------routes                               路由模块化配置
                                                               
       |----------------------utils                                工具类    
                                 |---------------- httpUrl.js       网络请求url 统一管理 
                                 |---------------- httpUtil.js      网络请求封装
````
##### 已解决问题
    * ant-mobile 按需加载，全局颜色管理
    * proxy 代理解决跨域
    * alias 访问资源文件
    * vm 高清解决方案、UI按照375*664 为基础换算
    * 动态路由配置
    * 不依赖外部传入url
##### 待解决    