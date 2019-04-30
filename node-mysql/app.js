var express = require("express"); //引入express模块
var app = express(); //创建express的实例
const { selectDate, updateSql, insertSql, deleteSql } = require("./config/mysql");
const { paramBody } = require("./utils/post.js");
app.get("/search", function(req, res) {
    let search = req.originalUrl.split("?")[1];
    selectDate(decodeURI(search))
        .then(rest => {
            res.send(rest);
        })
        .catch(err => {
            res.send(err);
        });
    //服务器响应请求
});
// 修改数据
app.put("/update", function(req, res) {});

// 新增数据
app.post("/insert", function(req, res) {
    paramBody(req).then(pres => {
        insertSql(pres)
            .then(ret => {
                res.send({
                    success: true,
                    message: "新增成功"
                });
            })
            .catch(err => {
                res.send(err);
            });
    });

    // res.send("ok");
});
app.delete("/delete", function(req, res) {
    console.log(req.query);
    deleteSql(req.query.id)
        .then(ret => {
            res.send({
                success: true,
                message: "删除成功"
            });
        })
        .catch(err => {
            res.send(err);
        });
});
app.listen(3000, function() {
    //监听3000端口
    console.log("Server running at 3000 port");
});
