const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime");

let cache = {}; // 缓存文件内容

// 发送404
function send404(response) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("Error 404:resource not found");
    response.end();
}

//提供文件数据服务
function sendFile(response, filePath, fileContents) {
    response.writeHead(200, {
        "Content-Type": mime.getType(path.basename(filePath))
    });
    response.end(fileContents);
}

// 静态文件缓存
function serverStatic(response, cache, absPath) {
    // 文件是否存在于内存，存在即返回
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        // 不存在则检索是否存在该存在，存在放置内存中
        fs.exists(absPath, function(exists) {
            if (exists) {
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                        return;
                    }
                    cache[absPath] = data;
                    sendFile(response, absPath, data);
                });
            } else {
                send404(response);
            }
        });
    }
}

let server = http.createServer(function(request, response) {
    let filePath = false;
    if (request.url == "/") {
        filePath = "public/index.html";
    } else {
        filePath = "public" + request.url;
    }
    let absPath = "./" + filePath;
    serverStatic(response, cache, absPath);
});
server.listen(8888, function() {
    console.log("open url: localhost:8888");
});

// 自定义依赖项
const chatServer = require("./lib/chat_server");
chatServer.listen(server);
