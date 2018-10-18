//  koa-compose

async function m1(next) {
    console.log('m1')
    await next()
    console.log('m1')
}
async function m2(next) {
    console.log('m2')
    await next()
    console.log('m2')
}
async function m3(next) {
    console.log('m3')
    await next()
    console.log('m3')
}
let middlewares = [m1, m2, m3]
let len = middlewares.length

// 最后一个中间件的next设置为一个立即resolve的promise函数
let next = async function() {
    return Promise.resolve()
}
for (let i = len - 1; i >= 0; i--) {
    next = createNext(middlewares[i], next)
}
function createNext(middleware, oldNext) {
    return async function() {
        await middleware(oldNext)
    }
}

next()
// async function m1(next) {
//     console.log('m1')
//     await next()
// }
// async function m2(next) {
//     console.log('m2')
//     await next()
// }
// async function m3(next) {
//     console.log('m3')
// }

// const createNext = (middleware, oldNext) => {
//     return async _ => {
//         await middleware(oldNext)
//     }
// }

// let next1 = createNext(m3, null)
// let next2 = createNext(m2, next1)
// let next3 = createNext(m1, next2)
// next3()
