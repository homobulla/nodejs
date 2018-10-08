const path = require('path')
const fs = require('fs')

// 读取目录
const dir = require('./dir')

// 封装读取内容文件方法
const file = require('./file')

/**
 * 获取静态资源内容
 * @param  {object} ctx koa上下文
 * @param  {string} 静态资源目录在本地的绝对路径
 * @return  {string} 请求获取到的本地内容
 */

const content = async (ctx, fullStaticPath) => {
    // 获取请求资源的绝对路径
    let reqPath = path.join(fullStaticPath, ctx.url)
    // 判断请求路径是否存在文件或目录
    let exist = fs.existsSync(reqPath)

    let content = ''
    // 路径或文件不存在则404
    if (!exist) {
        content = '404'
    } else {
        //如果存在，进一步判断是文件还是文件夹
        let stat = fs.statSync(reqPath)
        // 如果是文件夹,渲染文件目录
        if (stat.isDirectory()) {
            content = dir(ctx.url, reqPath)
        } else {
            // 否则，读取文件
            content = await file(reqPath)
        }
    }
    return content
}

module.exports = content
