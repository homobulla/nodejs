## Connect 自带的中间件

> 目前所有的中间件都从 Connect 中脱离出去

-   解析 cookie、请求主体和查询字符串的中间件
-   实现 Web 程序核心功能的中间件
-   处理 Web 程序安全的中间件
-   提供静态文件服务的中间件

### 解析 cookie、请求主体和查询字符串的中间件

-   cookieParser() 解析来自浏览器的 cookie，放到 req.cookies 中；
-   bodyParser() 读取并解析请求体，放到 req.body 中；
-   limit() 跟 bodyParser()联手防止读取过大的请求；
-   query() 解析请求 URL 的查询字符串，放到 req.query 中。

### cookie-Parser：解析 HTTP cookie

http 是无状态的，[cookie](http://bubkoo.com/2014/04/21/http-cookies-explained/)是为模拟状态而存在的一个东西。cookie-Parser 的 cookie 解析器支持常规 cookie 、签名 cookie 和特殊的 JSON cookie 。
常规 cookie 与签名 cookie 的区别在于签名 cookie 会放在 req.signedCookies 对象中，而常规的 cookie 放在 req.cookies 中。

有些代码运行结果达不到！！！

接下来是 bodyParser：解析请求主体， limit 用来限制传送数据的尺寸， query 用来解析 get 请求参数。

### session 会话管理

### 相关链接

-   [彻底理解 cookie、session、token](https://mp.weixin.qq.com/s/ow6CryxVrkeU79GD857d1w)
