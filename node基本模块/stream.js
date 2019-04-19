"use strict";

const fs = require("fs");
let stream = fs.createReadStream("test.txt", "utf-8");
stream.on("data", chunk => {
    console.log(`DATA:${chunk}`);
});
stream.on("end", _ => {
    console.log("END");
});
