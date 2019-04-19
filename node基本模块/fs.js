// fs 内置模块 文件读写
"use strict";
let fs = require("fs");
fs.readFile("test.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
// 读取二进制文件而不传入编码的情况下，data会返回一个buffer参数，
// buffer 是一个0/任意 个字节的数组
fs.readFile("module.png", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + " bytes");
    }
});
//  buffer与string的转换
// data.toString("utf-8")
// string 转 buffer
// let buf = Buffer.from(text,'utf-8')

// 写文件 只关心失败
fs.writeFile("test.txt", "测试一下fs模块的写文件操作", err => {
    if (err) {
        console.log(err);
    }
});

fs.stat("test.txt", (err, stat) => {
    if (err) return err;
    console.log(stat);
    console.log(`isFile:${stat.isFile()}`);
});
