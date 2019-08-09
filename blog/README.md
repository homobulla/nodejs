## node+mysql+koa 搭建的博客

### 原文地址

[node+koa+mysql 博客](http://www.wclimb.site/2017/07/12/Node-Koa2-Mysql-%E6%90%AD%E5%BB%BA%E7%AE%80%E6%98%93%E5%8D%9A%E5%AE%A2/)

### 目录说明

-   config 存放默认文件
-   lib 存放操作数据库文件
-   middlewares 存放判断登录与否文件
-   public 存放样式和头像文件
-   routes 存放路由文件
-   views 存放模板文件
-   index 程序主文件
-   package.json 包括项目名、作者、依赖 等等

### 依赖项作用说明

-   koa node 框架
-   koa-bodyparser 表单解析中间件
-   koa-mysql-session、koa-session-minimal 处理数据库的中间件
-   koa-router 路由中间件
-   koa-static 静态资源加载中间件
-   ejs 模板引擎
-   md5 密码加密
-   moment 时间中间件
-   mysql 数据库
-   markdown-it markdown 语法
-   koa-views 模板呈现中间件
-   chai mocha 测试使用
-   koa-static-cache 文件缓存- koa-bodyparser 表单解析中间件
-

## socket

目前加入了 socket ,但是所有的通信都是全体广播，需要有房间的概念，即需要改成单独通信。
