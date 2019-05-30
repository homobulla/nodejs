/**
 * 可配置的路由中间件
 * date: 2019-05-30
 */

const connect = require("connect");
const routet = require("./middleware/router");

let routers = {
    GET: {
        "/users": function(req, res) {
            res.end("tobi,loki,ferret");
        },
        "/user/:id": function(req, res, id) {
            res.end("user " + id);
        }
    },
    DELETE: {
        "/user/:id": function(req, res, id) {
            res.end("deleted user " + id);
            document.getElementById("ts-searchinput");
        }
    }
};
connect()
    .use(router(routes))
    .listen(3000);
