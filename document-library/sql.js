let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "library"
});
connection.connect();

//增
// let addSql = `INSERT INTO new(userid,name) VALUES(?,?)`;
// let addSqlParams = [3, "js"];
// connection.query(addSql, addSqlParams, function(err, res) {
//     if (err) {
//         console.log("新增错误：");
//         console.log(err);
//         return;
//     } else {
//         console.log("新增成功：");
//         console.log(res);
//     }
// });

// 删
// let deleteSql = `DELETE FROM new WHERE id = 3`;
// connection.query(deleteSql, function(err, res) {
//     if (err) {
//         console.log("删除错误：");
//         console.log(err);
//         return;
//     } else {
//         console.log("删除成功：");
//         console.log(res);
//     }
// });

// 改
let updateSql = `UPDATE new SET userid = ?,name=? WHERE id = ?`;
let updateSqlParams = [10, "汤姆", 4];
connection.query(updateSql, updateSqlParams, function(err, res) {
    if (err) {
        console.log("修改错误：");
        console.log(err);
        return;
    } else {
        console.log("修改成功：");
        console.log(res);
    }
});
connection.end();
