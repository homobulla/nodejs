const Koa = require('koa')
const app = new Koa()
// var router = require('koa-router')();
const bodyParser = require('koa-bodyparser')
const router = require('./router')

app.use(bodyParser())
app.use(router.routes())

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})
module.exports = app.listen(3000)
console.warn('*3000')
