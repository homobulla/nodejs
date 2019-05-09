const url = require("url");
const http = require("http");
// http.createServer(function(req, res) {
//     if (req.url !== "/favicon.ico") {
//         let result = url.parse(req.url, true);
//         console.log(result.query);
//     }
//     res.writeHead(200, {
//         "Content-Type": "text/html;charset=UTF-8"
//     });

//     // 往页面打印值
//     res.write('<h1 style="text-align:center">Hello NodeJS</h1>');

//     // 结束响应
//     res.end();
// }).listen(8888);
console.log(url.parse("http://www.baidu.com"));
// url.format是逆推出url,和parse恰好相反的方法。
console.log(
    url.format({
        protocol: "http:",
        slashes: true,
        auth: null,
        host: "www.baidu.com",
        port: null,
        hostname: "www.baidu.com",
        hash: null,
        search: "?name=zhangsan",
        query: "name=zhangsan",
        pathname: "/new",
        path: "/new?name=zhangsan",
        href: "http://www.baidu.com/new?name=zhangsan"
    })
);
