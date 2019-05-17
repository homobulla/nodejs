const events = require("events");
const net = require("net");
const channel = new events.EventEmitter();

channel.clients = {};
channel.subscripttions = {};

channel.on("join", function(id, client) {
    console.log(id, client);
    this.clients[id] = client;
    this.subscripttions[id] = function(sendId, message) {
        if (id != sendId) {
            // 忽略发出这一广播的用户
            this.clients[id].write(message);
        }
    };
    this.on("broacast", this.subscripttions[id]); // 添加对当前用户的监听
});
// channel.emit("join");
// 创建一个在用户断开连接时能打扫战场的监听器
channel.on("leave", function(id) {
    channel.removeListener("brocast", this.subscripttions[id]);
    channel.emit("broacast", id, id + "has left the chat.\n");
});
// 停止聊天
channel.on("shutdown", function() {
    channel.emit("broacast", "", "Chat has shutdown");
    channel.removeAllListeners("broacast");
});
const server = net
    .createServer(function(client) {
        let id = client.remoteAddress + ":" + client.remotePort;
        client.on("connect", function() {
            channel.emit("join", id, client);
        });
        client.on("data", function(data) {
            data = data.toString();
            if (data == "shutdown\r\n") {
                channel.emit("shutdown");
            }
            channel.emit("brocast", id, data);
        });
        client.on("close", function() {
            channel.emit(leave, id);
        });
    })
    .listen(8888);
