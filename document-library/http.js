const http = require("http");
http.createServer(function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8"
    });
    res.write('<h1 style="text-align:center">Hello NodeJS</h1>');
    res.end();
}).listen(8888);
