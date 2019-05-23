## 构建 node 程序

 用 Node 的 API 处理 HTTP 请求

 构建一个 RESTful Web 服务

 提供静态文件服务

 接受用户在表单中输入的数据

 用 HTTPS 加强程序的安全性

### 4.1 HTTP 服务器的基础知识

#### 4.1.1 Node 如何向开发者呈现 HTTP 请求

```js
const http = require("http");
http.createServer(function(req, res) {
    res.write("hello");
    res.end();
    // or we can write like this: res.end('hello')
}).listen(3000);
```

#### 4.1.3 读取请求头以及相应设定

```js
let body = "hello";
res.setHeader("Content-length", body.length);
res.setHeader("ontent-Type", "text/plain");
res.statusCode = "302"; // 状态码
res.end(body);
```

### 4.2 构建 RESTful Web 服务

创建标准的 REST 服务器需要实现四个 HTTP 谓词。每个谓词会覆盖一个待办事项清单的操作
任务：
 POST 向待办事项清单中添加事项；

 GET 显示当前事项列表，或者显示某一事项的详情；

 DELETE 从待办事项清单中移除事项；

 PUT 修改已有事项。

#### 4,2,1 用 post 请求创建资源

当 Node 的 HTTP 解析器读入并解析请求数据时，它会将数据做成 data 事件的形式，把解析好
的数据块放入其中，在默认情况下,data 事件会提供一个`buffer`（该对象是一个处理二进制数据的缓冲器）。我们可以通过`req.setEncoding(encoding)`来设定流编码。

#### 4.2.2 用 GET 请求获取资源

对于`get`请求而言，需要设置`Content-Length`可以提高响应速度。设定`Content-Length`域会隐含禁用`Node`的块编码，因为要传输的数据更少，所以能提升性能。

**`Content-Length`的值是字节长度**,`body.length`是字符长度，`Buffer.byteLength()`才是字节的长度.

```js
"ect……".length; //  5
Buffer.byteLength("ect……"); //  9
```

### 提供一个静态文件服务

每个静态文件服务器都有一个根目录，而在`node`中，变量`__dirname`会得到一个该文件所在目录的路径。通过该变量与`url.pathname`的配合可以得到任意文件的路径。

接下来是文件内容的传输工作，用高层流式硬盘访问 `fs.ReadStream` 完成，它是 `Node` 中 `Stream` 类之一。
如下一个基本的静态文件服务器：

```js
const http = require("http");
const fs = require("fs");
const parse = require("url").parse;
const join = require("path").join;

const root = __dirname; // 根目录

let server = http.createServer(function(req, res) {
    let url = parse(req.url);
    let path = join(root, url.pathname);
    let stream = fs.createReadStream(path); // 创建fs.ReadStream
    stream.on("data", function(err, chunk) {
        if (err) throw err;
        res.write(chunk);
    });
    stream.on("end", function() {
        res.end();
    });
});
server.listen(3000);
```

#### 优化之 STREAM.PIPE()数据传输

`node`中的管道即`pipe`概念对应着水管，即将一段数据流从源头`ReadableStream`传输到目的地`WritableStream`。在`node`中用`pipe`充当水管的功能：

```js
let readStream = fs.createReadStream("./original.txt");
let writeStream = fs.createWriteStream("./copy.txt");
readStream.pipe(writeStream);
```

上面的静态文件服务器的代码可以简化为：

```js
let stream = fs.createReadStream(path);
stream.pipe(res); // 这里res.end会在stream.pipe内部调用
```

更进一步的，可以使用`fs.stat`来做前置错误判断以及获取文件的相关信息（修改时间、字节长度）等。可以在`GET`请求时检查缓存是否过期，通过`fs.stat.size`来获取字节长度设置`Content-Length`;

### 从表单中接受用户输入

#### 处理提交的表单域

表单提交请求带的`Content-Type`值通常有两种：

-   `application/x-www-form-urlencoded` :这是 HTML 表单默认值
-   `multipart/form-data`: 在表单中含有文件或非 ASCII 或二进制数据时使用

#### 用 formidable 处理上传的文件

`formidable`是一个用于处理上传文件的第三方库，要正确处理上传的文件，并接收到文件的内容，需要把表单的`enctype`属性设为`multipart/form-data`，这是个适用于 BLOB（大型二进制文件）的 MIME 类型。同时其提供了`progress`事件让我们能监听到上传进度。

### 用 HTTPS 加强程序安全性

安全的超文本传输协议（HTTPS）提供了一种保证 Web 会话私密性的方法。 HTTPS 将 HTTP
和 TLS/SSL 传输层结合到一起。

在 Node 程序里使用 HTTPS，需要一个私钥和一份证书。私钥本
质上是个“秘钥”，可以用它来解密客户端发给服务器的数据。私钥保存在服务器上的一个文件
里，放在一个不可信用户无法轻易访问到的地方。

开发环境中生成私匙文件：

```shell
openssl genrsa 1024 > key.pem
```

有了私匙后，使用私匙创建证书，证书是公开的，包含公匙和持有人的信息，公匙用来加密从客服端发往服务端的信息：

```shell
openssl req -x509 -new -key key.pem > key-cert.pem
```
