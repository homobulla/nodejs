let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cainiao"
});

connection.connect();
// 查
function selectDate(search) {
    return new Promise((resolve, reject) => {
        let sql = search != "undefined" ? `SELECT * FROM websites WHERE ${search}` : `SELECT * FROM websites`;
        connection.query(sql, function(err, result) {
            if (err) {
                reject(err.message);
                return;
            }

            console.log("--------------------------SELECT----------------------------");
            console.log(result, typeof result);
            console.log("------------------------------------------------------------\n\n");
            resolve(result);
        });
    });
}

// 增
function insertSql(pres = []) {
    return new Promise(async (resolve, reject) => {
        // 先判断是否存在
        const result = await selectDate(`name='${pres.name}'`).then(res => {
            return res;
        });
        if (result.length != 0) {
            reject({
                success: false,
                err: `新增失败,已存在name为${pres.name}的数据。`
            });
            return;
        }
        var addsql = `INSERT INTO websites (Id,name,url,alexa,country) VALUES (0,?,?,?,?)`;
        connection.query(addsql, [pres.name, pres.url, pres.alexa, pres.country], function(err, ret) {
            if (err) {
                reject(err.message);
            }
            resolve(ret);
        });
    });
}

function updateSql() {
    return new Promise((resolve, reject) => {
        var updatesql = "UPDATE websites SET name=?,url=? WHERE Id = ?";
        var updatesqlParams = ["菜鸟移动", "http://m.runoob.com", 6];
        connection.query(updatesql, updatesqlParams, function(err, ret) {
            if (err) {
                console.log("[UPDATE]-" + err.message);
                return;
            }
            console.log(ret.affectedRows);
        });
    });
}
// connection.end();

// 删
function deleteSql(id) {
    return new Promise(async (resolve, reject) => {
        const result = await selectDate(`id=${id}`).then(res => {
            return res;
        });
        if (result.length == 0) {
            reject({
                success: false,
                err: `删除失败,不存在id为${id}的数据。`
            });
            return;
        }
        var deletesql = `DELETE FROM websites WHERE id = ${id}`;
        connection.query(deletesql, function(err, ret) {
            if (err) {
                reject(err.message);
                return;
            }
            resolve(ret);
        });
    });
}

module.exports = {
    selectDate,
    updateSql,
    insertSql,
    deleteSql
};
