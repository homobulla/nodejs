const Koa = require("koa");
const path = require("path");
const bodyParse = require("koa-bodyparser");
// const ejs = require("ejs");
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");
const config = require("./config/default.js");
// const router = require("koa-router");
const views = require("koa-views");
const staticCache = require("koa-static-cache");
const colors = require("colors");
const app = new Koa();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);
module.exports = { io };
io.on("disconnect", function(data) {
    console.log(colors.green("disconnect"), data);
});

// session配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST
};

app.use(
    session({
        key: "USER_SID",
        store: new MysqlStore(sessionMysqlConfig)
    })
);

// 缓存
app.use(
    staticCache(
        path.join(__dirname, "./public"),
        { dynamic: true },
        {
            maxAge: 365 * 24 * 60 * 60
        }
    )
);
app.use(
    staticCache(
        path.join(__dirname, "./images"),
        { dynamic: true },
        {
            maxAge: 365 * 24 * 60 * 60
        }
    )
);

// 服务端渲染模板引擎
app.use(
    views(path.join(__dirname, "./views"), {
        extension: "ejs"
    })
);

app.use(
    bodyParse({
        formLimit: "1mb"
    })
);

// 路由
app.use(require("./routers/signup.js").routes());
app.use(require("./routers/signin.js").routes());
app.use(require("./routers/posts.js").routes());

server.listen(4000, function() {
    console.log(`listening on port ${config.port}`);
});
