let fs = require("fs");
fs.stat("http.js", function(err, stats) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(stats.isDirectory());
});
// 创建文件
// fs.mkdir("css", err => {
//     if (err) {
//         if (err.code === "EEXIST") {
//             console.log("已存在同名文件");
//             return;
//         }
//         console.log(err);
//         return;
//     }
//     console.log("文件创建成功！");
// });

// 删除
// fs.rmdir("css", err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("文件删除成功！");
// });
// 新建 fs
// 流的方式读取文件
let fileReadStream = fs.createReadStream("url.js");
// 读取次数
let count = 0;
// 保存数据
let str = "";
// 开始读取
fileReadStream.on("data", chunk => {
    console.log(`${++count} 接收到：${chunk.length}`);
    // Console：1 接收到：30
    str += chunk;
});
// 读取完成
fileReadStream.on("end", () => {
    console.log("——结束——");
    console.log(count);
    // console.log(str);

    // Console：——结束——
    // 1
    // console.log("Hello World！");
});
// 读取失败
fileReadStream.on("error", error => {
    console.log(error);
});

let data = 'console.log("我要写入数据")';
let writeStream = fs.createWriteStream("README.md");
writeStream.write(data, "utf-8");
writeStream.end(); // 写入完成
writeStream.on("finish", function() {
    console.log("写入成功");
});
