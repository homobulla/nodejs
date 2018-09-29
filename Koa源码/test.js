let Koa = require('./application')
let app = new Koa()

const obj = {
    '/': 'this is main page',
    '/index': 'this is index page!',
    '/my': 'this is my page'
}
app.use((req, res) => {
    // 还没写中间件，所以这里还不是ctx和next
    res.end(obj[req.url])
})

app.listen(3000)
console.log('watching *3000')
