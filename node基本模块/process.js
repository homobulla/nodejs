// console.log(global);
// 下一次事件循环中的响应
process.nextTick(_ => {
    console.log("nextTick");
});
console.log("nextTick first!");
// 程序即将退出时的回调函数:
process.on("exit", code => {
    console.log("about to exit with code:" + code);
});
// 执行环境的识别
if (typeof window === "undefined") {
    console.log("node.js");
} else {
    console.log("browser");
}
