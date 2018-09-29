let http = require('http') // listen的语法糖
let EventEmitter = require('events') //继承EventEmitter来监听错误实例
let context = require('./context')
let request = require('./request')
let response = require('./response')

//const app = new Koa(); Koa是一个类，有两个方法，同时继承EventEmitter
class Koa extends EventEmitter {
    constructor() {
        super()
        this.fn
    }

    // use方法将回调函数传入
    use(fn) {
        this.fn = fn
    }

    //listen方法创建一个http服务并监听一个端口
    listen(...args) {
        let server = http.createServer(this.fn)
        server.listen(...args)
    }
}

module.exports = Koa
