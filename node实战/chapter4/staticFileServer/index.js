const http = require("http");
const fs = require("fs");
const parse = require("url").parse;
const join = require("path").join;

const root = __dirname; // 根目录

let server = http.createServer(function(req, res) {
    let url = parse(req.url);
    let path = join(root, url.pathname);
    fs.stat(path, function(err, stat) {
        if (err) {
            if ("ENOENT" == err.code) {
                res.statusCode = 404;
                res.end("Not found");
            } else {
                res.statusCode = 500;
                res.end("Internal server error");
            }
        } else {
            let stream = fs.createReadStream(path); // 创建fs.ReadStream
            res.setHeader("Content-Length", stat.size); // 这里用stat.size 能得到字节长度；
            // stream.on("data", function(err, chunk) {
            //     if (err) throw err;
            //     res.write(chunk);
            // });
            // stream.on("end", function() {
            //     res.end();
            // });
            stream.pipe(res);
            // 容错
            stream.on("error", function(err) {
                res.statusCode = "500";
                res.end("Internal server error");
            });
        }
    });
});
server.listen(3000);
