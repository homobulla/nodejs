/**
 * 显示面板管理的中间件
 * date:2019-05-30
 */

function admin(req, res, next) {
    switch (req.url) {
        case "/":
            res.end("try/users");
            break;
        case "/users":
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(["tobi", "homo", "bulla"]));
            break;
    }
}
