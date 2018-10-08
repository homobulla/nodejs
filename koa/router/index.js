const KoaRouter = require('koa-router')
const homo = require('../controller/commen')

const router = new KoaRouter()
// 中间件必须是函数
router.get('/test', homo.message)
router.get('/', homo.index)

module.exports = router
