let mysql = require("mysql");
let http = require("http");
let url = require("url");
let qs = require("querystring");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "front"
});
connection.connect();
/*
	用http创建服务
*/
const urlObj = {
    "/sendMessage": "提交留言信息",
    "/login": "登录",
    "/register": "注册"
};
const getUrlName = url => {
    return urlObj[url];
};
// 获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var year = date.getFullYear(); // 年
    var month = date.getMonth() + 1; // 月
    var strDate = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minute = date.getMinutes(); // 分
    var second = date.getMinutes(); // 秒
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    // 返回 yyyy-mm-dd hh:mm:ss 形式
    var currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second;
    return currentdate;
}
http.createServer(function(req, res) {
    // cors跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    // header类型
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // 跨域允许方式
    res.setHeader("Content-Type", "application/json");

    if (req.method == "POST") {
        console.log("\n【post请求】");
        let pathName = req.url;
        console.log("\n【请求接口为：" + pathName + "】");

        let tempResult = "";
        req.addListener("data", function(chunk) {
            tempResult += chunk;
        });
        req.addListener("end", function() {
            let result = JSON.stringify(qs.parse(tempResult));
            console.log("\n【参数为:】" + result);

            const log = getUrlName(pathName);
            console.log(`\n【${log}】`);
        });
    } else {
        if (req.method == "GET") {
            console.log(`\n【GET请求】`);
            // 解析get
            let pathName = url.parse(req.url).pathname;
            console.log(`\n【接口为：${pathName}】`);
            if (pathName == "/getMessage") {
                // 获取留言信息

                console.log("\n【API - 获取留言信息】");
            } else if (pathName == "/") {
                // 首页
                res.writeHead(200, {
                    "Content-Type": "text/html;charset=UTF-8"
                });

                res.write(
                    '<h1 style="text-align:center">jsliang 前端有限公司服务已开启！</h1><h2 style="text-align:center">详情可见：<a href="https://github.com/LiangJunrong/document-library/blob/master/other-library/Node/NodeBase.md" target="_blank">Node 基础</a></h2>'
                );

                res.end();
            }
        }
    }
}).listen(8888, function() {
    console.log("running...");
});
