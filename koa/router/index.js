const KoaRouter = require('koa-router');
const homo = require('../controller/commen');

const router = new KoaRouter();
// 中间件必须是函数
console.log(typeof homo.message, 'homo.messages');
router.post('/test', homo.message);

module.exports = router;
