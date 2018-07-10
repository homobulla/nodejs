const Koa = require('koa');
const app = new Koa();
// var router = require('koa-router')();

 const router = require('./router')

const main = ctx => {
    ctx.set('Access-Control-Allow-Origin', "*");
    var obj = ctx.request;
    ctx.response.body = ctx.request;
  };

app.use(router.routes())
// router.use(app)
//注册路由
// router.get('/', async (ctx, next) => {
//     console.log('index');
//     ctx.body = 'index';
//   });
  
//   app.use(router.routes());  // 添加路由中间件
//   app.use(router.allowedMethods());
app.on('error', (err, ctx) => {
    log.error('server error', err, ctx)
});
app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});
