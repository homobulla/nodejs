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
