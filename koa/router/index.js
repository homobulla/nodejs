var KoaRouter = require('koa-router');
var homo = require('../controller/commen');

// module.exports = function(){
//   router.get('/', homo.message);
//   return router
// }
const router = new KoaRouter()
// 中间件必须是函数
console.log(typeof homo.message,'homo.messages')
router
  .post('/test', homo.message);

module.exports = router
