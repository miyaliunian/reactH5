#React 开发 WebApp 框架：
##使用
* 下载依赖文件 
    * 在命令行中执行：yarn
* 启动项目：
  * 非 HTTPS 请求 : yarn start
  * HTTPS 请求 : HTTPS=true yarn start
## IDE调试：WebStorm
* 1：添加debug配置 debug 的方式为:JavaScript Debug  
* 2：在url出填写 'http://localhost:3000/'
* 3：yarn start 启动项目
* 4：点击虫子开启debug
##目录结构
````$xslt
    public：这个文件夹是静态文件 不会参与到打包
    src:
       |-----------------------assets:                    
                                 |---------------- less                             公共样式文件夹
                                                     |--varible.css                    * 公共全局样式         
                                 |---------------- static                           静态资源
                                                     |--DictionaryConstant.js          * 字典常量
                                                     |--index.js                       * 登录密码加密公钥                                          
       |-----------------------components:                                          公共组件
                                 |---------------- BindCard                            * 家庭成员列表
                                 |---------------- Button                              * 按钮组件
                                 |---------------- Calendar                            * 日历组件
                                 |---------------- ErrorToast                          * 错误提示组件
                                 |---------------- Footer                              * 页脚组件
                                 |---------------- Header                              * 导航条组件
                                 |---------------- IOSSwitch                           * Switch组件
                                 |---------------- Loading                             * LoadingMask组件
                                 |---------------- Refresh                             * 上下拉刷新组件
       |-----------------------containers:                                          业务组件文件夹
                                 |---------------- App                                 * App（误改、误删）
                                 |---------------- Home                                * 首页九宫格
                                 |---------------- Division                            * 科室列表
                                 |---------------- DoctorList                          * 医生列表
                                 |---------------- Doctor                              * 医生详情
                                 |---------------- Reservation                         * 预约信息
       |-----------------------images:                                              图片资源
                                 |---------------- Home                                 * 挂号流程icon资源   
       |-----------------------reduxs:                                              Redux统一状态管理
                                 |---------------- middeleware                          * 中间件 
                                 |---------------- modules                              * 业务模块redux
       |-----------------------routes                                               路由模块化配置
                                 |---------------- routerMap.js                         * 具体的路由配置
       |----------------------utils                                                 工具类    
                                 |---------------- httpUrl.js                           * 网络请求url 统一管理
                                 |---------------- dayutils.js                          * 日期工具类
                                 |---------------- formateDate.js                       * 格式化时间戳  
                                 |---------------- httpUtil.js                          * 网络请求封装
````
## 开发流程
#####  创建业务容器组件
* /containers 
    * 容器组件 xx.js 
    * 容器样式 style.less
#####  新增需要跳转的页面
* /routes 
    * routerMap.js 
    ```angular2
    有三个参数:
              path: 跳转的路由 (必传)
              name: 路由名     (必传)
              auth: true/false   (如果需要登录验证则传递true,否则可以不传)  
              component: 路由组件  (比传)
    ```    
#####  创建业务对应的redux    
* /reduxs 
    * 新增的redux 需要在 /redux/index.js 也增加一份
#####   新增网络请求url
* /utils/httpUrl
    * 如果请求存在跨域的问题，在往下看
#####   新增图片资源   
* /images 
    * 新增的图片资源引入方式
                    import xxx from '@image/xxx/xxxx'

## 关键点
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
* 增加对react-Hooks 规则验证
* 新增日历组件
* 引入声明式动画
* 新增封装-Switch 组件
* 新增封装-Button组件
* 新增ActionSheet组件
* https网络处理
##### 待解决
* 操作手册    
* 懒加载
* PWA
* webpack优化


##### 框架更新版本日志
* 新增登录权限验证 

    

##### 移动端适配(vm) 
如果视觉视口为375px，那么1vw = 3.75px，
                      10.667vm =       
'这时UI给定一个元素的宽为75px（设备独立像素），我们只需要将它设置为75 / 3.75 = 20vw。
当然，没有一种方案是十全十美的，vw同样有一定的缺陷：
* px转换成vw不一定能完全整除，因此有一定的像素差。
* 比如当容器使用vw，margin采用px时，很容易造成整体宽度超过100vw，从而影响布局效果。当然我们也是可以避免的，例如使用padding代替margin，结合calc()函数使用等等...