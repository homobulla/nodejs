/**
 *
 * 支持文件上传的HTTP服务器
 * date: 2019/05/23
 * author: homobulla
 */

const http = require("http");
const formidable = require("formidable"); // 文件上传
let items = [];
let server = http.createServer(function(req, res) {
    if ("/" == req.url) {
        switch (req.method) {
            case "GET":
                show(res);
                break;
            case "POST":
                upload(req, res);
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
        `<form method='post' action='/' enctype='multipart/form-data'>` +
        `<p><input type='text' name='item'/></p>` +
        `<p><input type='file' name='file'/></p>` +
        `<p><input type='submit' value='Upload' /></p>` +
        `</form></body></html>`;
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", Buffer.byteLength(html));
    res.end(html);
}

// 解析上传文件
function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end("Bad Request:excepting multipart/form-data");
        return;
    }

    let form = new formidable.IncomingForm();

    // form.on("field", function(field, value) {
    //     console.log(field, value);
    // });
    // form.on("file", function(name, file) {
    //     console.log(name, file);
    // });
    // form.on("end", function() {
    //     console.log("upload complete");
    // });
    // progress事件能给出收到的字节数以及期望的字节数
    form.on("progress", function(bytesRecived, bytesExpected) {
        let persent = Math.floor((bytesRecived / bytesExpected) * 100);
        console.log(persent);
    });
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        console.log(files);
        console.log("complete");
    });
}
// 请求类型是否为文件上传
function isFormData(req) {
    let type = req.headers["content-type"] || "";
    return 0 == type.indexOf("multipart/form-data");
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
