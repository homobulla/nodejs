const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

let em = new MyEmitter();

em.on("test", function(data) {
    console.log("data: " + data);
});

em.emit("test", "传递消息很快");
var emitter3 = new MyEmitter();
// 当任何on事件添加到EventEmitter时，就会触发newListener事件
emitter3.on("newListener", function(name, listener) {
    console.log("新事件的名字:", name);
    console.log("新事件的代码:", listener);
    setTimeout(function() {
        console.log("我是自定义延时处理机制");
    }, 1000);
});
emitter3.on("hello", function() {
    console.log("hello　node");
});
