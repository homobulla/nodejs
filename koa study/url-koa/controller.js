const fs = require("fs");

/*
 * 识别不同请求方式对应的路由方法
 * @parame router {new Function} koa-router
 * @parame mapping {Array}
 * @return void
 */
function addMapping(router, mapping) {
    for (let url in mapping) {
        console.log(url, "url");
        if (url.startsWith("GET ")) {
            router.get(url.substring(4), mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith("POST ")) {
            router.post(url.substring(5), mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith("PUT ")) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith("DELETE ")) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`, "错误的url");
        }
    }
}

/*
 * 扫描dir下的所有路由并传入识别分类解析addMapping方法中
 * params dir {string} 文件夹名
 * params router {new Function} 路由
 * return void
 */
function addControllers(router, dir) {
    fs.readdirSync(__dirname + "/" + dir)
        .filter(f => {
            return f.endsWith(".js");
        })
        .forEach(f => {
            console.log(`process controller: ${f}...`);
            let mapping = require(__dirname + "/" + dir + "/" + f);
            addMapping(router, mapping);
        });
}

/*
 * 映射出文件下的所有路由
 * params dir {string} 文件夹名
 * return 路由
 */
module.exports = function(dir) {
    let controllers_dir = dir || "controller",
        router = require("koa-router")();
    addControllers(router, controllers_dir);
    return router.routes();
};
