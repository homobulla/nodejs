const Koa = require('koa')
const app = new Koa()

// app.use(async ctx => {
//     let url = ctx.url
//     // 1 从上下文的request对象获取
//     let request = ctx.request
//     let req_query = request.query
//     let req_querystring = request.querystring

//     // 2 从ctx直接获取
//     let ctx_query = ctx.query
//     let ctx_querystring = ctx.querystring

//     ctx.body = {
//         url,
//         req_query,
//         req_querystring,
//         ctx_query,
//         ctx_querystring
//     }
// })
app.use(async (ctx, next) => {
    console.log(1)
    await next()
    console.log(1)
})
// #2
app.use(async (ctx, next) => {
    console.log(2)
    await next()
    console.log(2)
})

app.use(async (ctx, next) => {
    console.log(3)
})
app.listen(3000, _ => {
    console.log('[demo] request get is starting at port 3000')
})
