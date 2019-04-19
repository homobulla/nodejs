"use strict";

const fs = require("fs");
let stream = fs.createReadStream("test.txt", "utf-8");
stream.on("data", chunk => {
    console.log(`DATA:${chunk}`);
});
stream.on("end", _ => {
    console.log("END");
});

var ws1 = fs.createWriteStream("output1.txt", "utf-8");
ws1.write("使用Stream写入文本数据...\n");
ws1.write("END.");
ws1.end();

var ws2 = fs.createWriteStream("output2.txt");
ws2.write(new Buffer("使用Stream写入二进制数据...\n", "utf-8"));
ws2.write(new Buffer("END.", "utf-8"));
ws2.end();
