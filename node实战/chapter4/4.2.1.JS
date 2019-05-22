const http = require("http");
const url = require("url");
let items = [];

http.createServer(function(req, res) {
    switch (req.method) {
        case "POST":
            let data = "";
            req.setEncoding("utf8");
            req.on("data", function(chunk) {
                data += chunk; //数据块默认buffer对象 ['object Unit8Array']
            });

            req.on("end", function() {
                items.push(data);
                res.end("OK\n");
            });
            break;
        case "GET":
            let body = items
                .map(function(item, i) {
                    return i + item;
                })
                .join("\n");
            // 用Buffer.byteLength获取body的字节长度
            res.setHeader("Content-Length", Buffer.byteLength(body));
            res.setHeader("Content-Type", 'text/plain;charset="utf-8"');
            res.end(body);
        case "DELETE":
            let path = url.parse(req.url).pathname;
            let i = parseInt(path.slice(1), 10);
            if (isNaN(i)) {
                res.statusCode = 400;
                res.end("Invalid item id");
            } else if (!item[i]) {
                res.statusCode = 404;
                res.end("Item not found");
            } else {
                items.splice(i, 1);
                res.end("OK\n");
            }
            break;
    }
});
