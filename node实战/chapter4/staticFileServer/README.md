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

#### 优化之STREAM.PIPE()数据传输

`node`中的管道即`pipe`概念对应着水管，即将一段数据流从源头`ReadableStream`传输到目的地`WritableStream`。在`node`中用`pipe`充当水管的功能：

```js
let readStream = fs.createReadStream('./original.txt');
let writeStream = fs.createWriteStream('./copy.txt')
readStream.pipe(writeStream);
```

上面的静态文件服务器的代码可以简化为：

```js
let stream = fs.createReadStream(path);
stream.pipe(res) // 这里res.end会在stream.pipe内部调用
```

更进一步的，可以使用`fs.stat`来做前置错误判断以及获取文件的相关信息（修改时间、字节长度）等。可以在`GET`请求时检查缓存是否过期，通过`fs.stat.size`来获取字节长度设置`Content-Length`;

### 从表单中接受用户输入

#### 处理提交的表单域

表单提交请求带的`Content-Type`值通常有两种：

- `application/x-www-form-urlencoded` :这是 HTML 表单默认值
- `multipart/form-data`: 在表单中含有文件或非 ASCII 或二进制数据时使用



