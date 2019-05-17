### Node中的异步编程

服务端的异步编程：事件发生触发响应逻辑

- 回调
- 事件监听

回调通常用来定义**一次性响应**的逻辑，事件监听器本质上也是一个回调，不同的是，它跟一个**概念实体（事件）**相关联。

```js
server.on('request',handleRequest);
```



#### 用回调处理一次性事件

主要是回调嵌套的处理：1.创建中间函数以减少嵌套 2.尽早`return`减少`if...else`嵌套。

#### 用事件发射器处理重复性事件

一些`Node API`都是事件发射器，比如`HTTP`服务器、`TCP`服务器、流。类似于`addEventListener`一样，我们可以使用`on`方法响应事件：

```js
const net = require('net');
let server = net.createServer(function(socket){
    socket.on('data',function(data){
        // socket.once则响应单次事件
        socket.write(data);
    });
});

```

##### 创建事件发射器

我们可以用`events`来自定义事件发射器：

```js
// 给join事件添加监听器
const EventEmitter = require('events').EventEmitter;
const channel = new EventEmitter;
channel.on('join',function(){
    console.log('Welcome');
});
// 发射emit事件触发监听器
channel.emit('join');
```

##### 用事件发射器实现简单的发布/订阅系统

```js
const events = require('events');
const net  = require('net');
const channle = new events.EventEmitter();
channel.clients = {};
channel.subscripttions = {};
channel.on('join',function(id,client){
    this.clients[id] = client;
    this.subscrip
})
```

