const Koa = require('koa')
const app = new Koa()
// 对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
// bodyParser 做了函数parsePostData和parseQueryStr
const bodyParser = require('koa-bodyparser')

const parseQueryStr = queryStr => {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}
// 将POST请求参数字符串解析成JSON
const parsePostData = ctx => {
    return new Promise((resolve, reject) => {
        try {
            let postData = ''
            //ctx.request是context经过封装的请求对象，ctx.req是context提供的node.js原生HTTP请求对象
            ctx.req.addListener('data', data => {
                postData += data
            })
            ctx.req.addListener('end', _ => {
                let parseData = parseQueryStr(postData)
                resolve(parseData)
            })
        } catch (err) {
            reject(err)
        }
    })
}
app.use(bodyParser())
app.use(async ctx => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        // get 请求返回页面内容
        let html = `
        <h1>koa2 request post demo</h1>
        <form method="POST" action="/">
          <p>userName</p>
          <input name="userName" /><br/>
          <p>nickName</p>
          <input name="nickName" /><br/>
          <p>email</p>
          <input name="email" /><br/>
          <button type="submit">submit</button>
        </form>
        `
        ctx.body = html
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        // 当POST请求的时候，解析POST表单里的数据，并显示出来

        // let postData = await parsePostData(ctx)
        // ctx.body = postData
        // console.log(postData, 'postData')
        // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
        let postData = ctx.request.body
        ctx.body = postData
    } else {
        ctx.body = `<h1>404</h1>`
    }
})

//解析上下文里node原生请求的POST参数

app.listen(3000, () => {
    console.log('[demo] request post is starting at port 3000')
})
