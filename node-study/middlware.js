const express = require('express')
const app = express()

// app.use加载中间件，通过next传到下一个中间件，一旦报错就会失败
// 中间件的加载顺序很重要，一般日志在最前面
app.use(function(req, res, next) {
    console.log(1)
    next(new Error('hhhh'))
})

app.use(function(req, res, next) {
    console.log(2)
    res.status(200).end()
})

//错误处理
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
app.listen(4000)
