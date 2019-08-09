const mysql = require("mysql");
const config = require("../config/default");
const colors = require("colors");
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release(); // 连接不再使用返回到连接池
                });
            }
        });
    });
};

let users = `create table if not exists users(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	pass VARCHAR(100) NOT NULL,
	avator VARCHAR(100) NOT NULL,
	moment VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
)`;

let posts = `create table if not exists posts(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	title VARCHAR(256) NOT NULL,
	content VARCHAR(256) NOT NULL,
	md VARCHAR(256) NOT NULL,
	uid VARCHAR(40) NOT NULL,
	moment VARCHAR(100) NOT NULL,
	comments VARCHAR(200) NOT NULL DEFAULT '0',
	pv VARCHAR(40) NOT NULL DEFAULT '0',
	avator VARCHAR(100) NOT NULL,
	PRIMARY KEY ( id )
);`;

let comment = `create table if not exists comment(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	content TEXT(0) NOT NULL,
	moment VARCHAR(40) NOT NULL,
	postid VARCHAR(40) NOT NULL,
	avator VARCHAR(100) NOT NULL,
	PRIMARY KEY ( id )
);`;

let createTable = function(sql) {
    return query(sql, []);
};

// 建表
createTable(users);
createTable(posts);
createTable(comment);

// 通过名字查找用户
let findDataByName = function(name) {
    let _sql = `select * from users where name="${name}";`;
    return query(_sql);
};
// 注册新用户
let insertData = function(values) {
    let _sql = `insert into users set name=?,pass=?,avator=?,moment=?;`;
    return query(_sql, values);
};
// 通过文章名字查找用户
let findDataByUser = function(name) {
    let _sql = `select * from users WHERE name="${name}"`;
    return query(_sql);
};
// 发布文章
let insertPost = function(value) {
    let _sql = "insert into posts set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?;";
    return query(_sql, value);
};

// 查询所有文章
let findAllPost = function() {
    let _sql = "select * from posts";
    return query(_sql);
};
// 分页文章
let findPostByPage = function(page) {
    let _sql = `select * from posts limit ${(page - 1) * 10},10; `;
    return query(_sql);
};
// 查询个人分页文章
let findPostByUserPage = function(name, page) {
    let _sql = `select * from posts where name="${name}" order by id desc limit ${(page - 1) * 10},10;`;
    return query(_sql);
};
// 查看文章详情
let findDataById = function(id) {
    let _sql = `select * from posts where id = ${id};`;
    return query(_sql);
};
let updatePostPv = function(pv, postid) {
    let _sql = `update posts set pv=${pv} where id=${postid};`;
    return query(_sql);
};
// 获取评论
let findCommentByPage = function(page, postId) {
    let _sql = `select * from comment where postid=${postId} order by id desc limit ${(page - 1) * 10},10 ;`;
    return query(_sql);
};
// 评论内容
let findCommentById = function(postid) {
    let _sql = `select * from comment where postid=${postid};`;
    return query(_sql);
};
// 获取用户信息
let findUserData = function(name) {
    let _sql = `select * from users where name="${name}";`;
    return query(_sql);
};
// 添加评论
let insertComment = function(values) {
    let _sql = `insert into comment set name=?,content=?,moment=?,postid=?,avator=?;`;
    return query(_sql, values);
};
// 更新评论数
let updatePostComment = function(values) {
    let _sql = `update posts set comments=? where id=?`;
    return query(_sql, values);
};
// 删除评论
let deletComment = function(id) {
    let _sql = `delete from comment where id=${id};`;
    return query(_sql);
};
// 删除文章
let deletePost = function(id) {
    let _sql = `delete from posts where id=${id};`;
    return query(_sql);
};
// 编辑文章
let editPost = function(values) {
    let _sql = `update posts set title=?,content=? where id =?;`;
    return query(_sql, values);
};
module.exports = {
    query,
    createTable,
    findDataByUser,
    insertPost,
    findDataByName,
    findAllPost,
    insertData,
    findPostByPage,
    findPostByUserPage,
    findDataById,
    updatePostPv,
    findCommentByPage,
    findCommentById,
    findUserData,
    insertComment,
    updatePostComment,
    deletComment,
    deletePost,
    editPost
};
