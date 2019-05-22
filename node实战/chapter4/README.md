## 构建 node 程序

 用 Node 的 API 处理 HTTP 请求
 构建一个 RESTful Web 服务
 提供静态文件服务
 接受用户在表单中输入的数据
 用 HTTPS 加强程序的安全性

### 4.1 HTTP 服务器的基础知识

#### 4.1.1 Node 如何向开发者呈现 HTTP 请求

```js
const http = require('http');
http.createServer(function(req,res){
    res.write('hello');
    res.end();
    // or we can write like this: res.end('hello')
}).listen(3000)
```

#### 4.1.3 读取请求头以及相应设定

```js
let body = 'hello';
res.setHeader('Content-length',body.length);
res.setHeader('ontent-Type','text/plain');
res.statusCode = '302' // 状态码
res.end(body);

```

### 4.2 构建RESTful Web服务

创建标准的REST服务器需要实现四个HTTP谓词。每个谓词会覆盖一个待办事项清单的操作
任务：
 POST 向待办事项清单中添加事项；
 GET 显示当前事项列表，或者显示某一事项的详情；
 DELETE 从待办事项清单中移除事项；
 PUT 修改已有事项。

#### 4,2,1用post请求创建资源

当Node的HTTP解析器读入并解析请求数据时，它会将数据做成data事件的形式，把解析好
的数据块放入其中，在默认情况下,data事件会提供一个`buffer`（该对象是一个处理二进制数据的缓冲器）。我们可以通过`req.setEncoding(encoding)`来设定流编码。

#### 4.2.2 用GET请求获取资源

对于`get`请求而言，需要设置`Content-Length`可以提高响应速度。设定`Content-Length`域会隐含禁用`Node`的块编码，因为要传输的数据更少，所以能提升性能。

**`Content-Length`的值是字节长度**,`body.length`是字符长度，`Buffer.byteLength()`才是字节的长度.

```js
'ect……'.length //  5
Buffer.byteLength('ect……') //  9
```

