const express = require('express')
const app = express()
const path = require('path')
const indexRouter = require('./router/index')
const userRouter = require('./router/users')

// 设置返回模板，使用ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', indexRouter)
app.use('/users', userRouter)

app.listen(3000)
