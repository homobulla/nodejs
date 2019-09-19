const util = require("util");
const EventEmitter = require("events").EventEmitter;

function MyEmitter() {
    EventEmitter.call(this); //构造函数
}
util.inherits(MyEmitter, EventEmitter); // 继承

let em = new MyEmitter();

em.on("test", function(data) {
    console.log("data: " + data);
});

em.emit("test", "传递消息很快");
