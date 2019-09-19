// process 全局对象 是EventMitter的实例
// console.log(process.stdin, process.stdout, process.stderr);
process.on("beforeExit", code => {
    console.log("进程 beforeExit 事件的代码: ", code);
});

process.on("exit", code => {
    console.log("进程 exit 事件的代码: ", code);
});

console.log("此消息最新显示", process.cwd());
console.log(`This processor architecture is ${process.arch}`, process.argv);
