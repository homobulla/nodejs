
  exports.message = async ctx => {
        ctx.set('Access-Control-Allow-Origin', "*");
        ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        ctx.set("Access-Control-Allow-Methods","POST,DELETEs");
        ctx.response.body = '提交错误成功，后端已写入数据库'
  }

