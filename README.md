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
##### 开发流程
* 登录权限控制,框架会自动处理登录逻辑跳转
```angularjs
          只需要在 /routers/routerMap.js 按照如下定义路由规则
            {
                path: '/bindCard',
                name: 'BindCard',
                auth: true,  // 如果auth: true则框架会验证是否已经登录 如果没登录则自动跳转到登录页面，反之则不会进行登录验证
                component: BindCard
            },
```  
* 跨域请求 只需要在维护请求url的文件内新增需要跨域请求的地址，框架内自动处理跨域的请求
```angular2html
    httpUrl中新增请求的地址: 格式如下
          API__BIND_CARD_LIST: () => `/baseURL/bindcard/v1.0/list.do`,            

```
* 不需要跨域的请求 
```angular2html
    httpUrl中新增请求的地址: 格式如下
          API_AREA_LIST: (cityId) => `${BASE_URL}/city/v1.0/list/${cityId}.ch`,         
```

##### 已解决问题
    * ant-mobile 按需加载，全局颜色管理
    * proxy 代理解决跨域
    * alias 访问资源文件
    * vm 高清解决方案、UI按照375*664 为基础换算
    * 动态路由配置
    * 不依赖外部传入url
##### 待解决    



##### 框架更新版本日志
* 新增登录权限验证 


