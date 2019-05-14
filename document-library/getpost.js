let http = require("http");
let sql = [];
http.createServer(function(req, res) {
    // 跨域域名
    res.setHeader("Access-Control-Allow-Origin", "*");
    // 设置header类型
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // 允许跨域的请求方式
    res.setHeader("Content-Type", "application/json");

    switch (req.method) {
        case "OPTIONS":
            res.statusCode = 200;
            res.end();
            break;

        case "GET":
            let data = JSON.stringify(sql);
            res.write(data);
            res.end();
            break;
        case "POST":
            let item = "";

            req.on("data", function(chunk) {
                item += chunk;
            });
            req.on("end", function() {
                console.log(item);
                item = JSON.parse(item);
                sql.push(item.item);
                let data = JSON.stringify(sql);
                res.write(data);
                res.end();
            });
    }
}).listen(3000);
console.log("http server is start...");
