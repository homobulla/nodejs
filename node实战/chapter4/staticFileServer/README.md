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
