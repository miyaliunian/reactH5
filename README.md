#H5WebApp：
##创建项目
* yarn 安装依赖
* yarn yarn create react-app 项目名
* yarn start
## IDE调试
* 添加debug配置 debug 的方式为:JavaScript Debug  
* 在url出填写 'http://localhost:3000/'
* yarn start 启动项目
* 点击虫子开启debug
##目录结构
````$xslt
    public：这个文件夹是静态文件 不会参与到打包
    components:展示型组件
    项目公用的
    containers:容器型组件:业务组件文件夹
        |
        |--------App 项目根组件
                   |------- index.js 
                   |-------  style.css 根样式
        |--------Home 首页组件
                   |------- index.js 
                   |-------  style.css 根样式   
                           
    images: 静态图片
    redux:redux 文件夹
         middleware: 中间件
         modules: 模块数据文件夹
    utils: 工具类
````
状态模块定义
前端状态分为 三部分
1）商品、店铺、订单、评论 业务数据(医院列表、诊室列表、诊室能挂的号的列表)
2）各页面UI状态(多选框的选中状态，一个输入框的输入信息，一个loading的弹出框是否弹出...)
3) 基础状态： 登录态、全局异常信息


框架内将
1业务数据自己手动请求 将2、3 合并为一个整体 系统内部处理

redux模块采用的是ducks设计模式：
   所以将 reducer、actions、 action-type,selected 都聚合到一个文件中
   
   ````$xslt
使用redux-thunk中间件 简化 action creators 到 reducers 的过程
    格式应该如下
     {
        FETCH_DATA:{ // 表明这个action是用来获取数据的
        types: ['request','success','fail'], // 数组内 定义了 action.type
        urlPoint: '',  // 描述请求对应的地址
        schema:{       //在数据库当中代表的是表的结构，在我这个框架中 代表的是业务数据的结构 需要对服务器返回的数据进行扁平化处理数据转换成key：value
          id: 'product_id',
          name: '' // 用来标识当前中间件正在处理的业务数据是哪部分的,这部分应该定义在/modules/entities/xxx.js 
        }
        }
     }  
````
react-slick : 滚动组件