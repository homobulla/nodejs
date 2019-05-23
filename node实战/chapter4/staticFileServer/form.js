/**
 *
 * 支持GET和POST的HTTP服务器
 * date: 2019/05/23
 * author: homobulla
 */

const http = require("http");
const qs = require("querystring");
let items = [];
let server = http.createServer(function(req, res) {
    if ("/" == req.url) {
        switch (req.method) {
            case "GET":
                show(res);
                break;
            case "POST":
                add(req, res);
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
});
server.listen(3000);

//
function show(res) {
    let html =
        `<html><head><title>Todo list</title></head><body>` +
        `<h1>Todo list </h1>` +
        `<ul>` +
        items
            .map(function(item) {
                return `<li>${item}</li>`;
            })
            .join("") +
        `</ul>` +
        `<form method='post' action='/'>` +
        `<p><input type='text' name='item'/></p>` +
        `<p><input type='submit' value='Add Item' /></p>` +
        `</form></body></html>`;
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", Buffer.byteLength(html));
    res.end(html);
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("notFound");
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.end("badRequest");
}

function add(req, res) {
    let body = "";
    req.setEncoding("utf8"); // 非二进制，设置utf8效率高
    req.on("data", function(chunk) {
        body += chunk;
    });
    req.on("end", function() {
        let obj = qs.parse(body);
        items.push(obj.item);
        console.log(items);
        show(res);
    });
}
