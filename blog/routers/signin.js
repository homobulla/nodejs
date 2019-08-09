const router = require("koa-router")();
const userModel = require("../lib/mysql.js");
const md5 = require("md5");
const checkNotLogin = require("../middlewares/check.js").checkNotLogin;
const checkLogin = require("../middlewares/check.js").checkLogin;

router.get("/signin", async (ctx, next) => {
    // await checkNotLogin(ctx);
    await ctx.render("signin", {
        session: ctx.session
    });
});
router.post("/signin", async (ctx, next) => {
    let { name, password } = ctx.request.body;

    await userModel
        .findDataByName(name)
        .then(res => {
            if (res[0] && name === res[0]["name"] && md5(password) === res[0]["pass"]) {
                ctx.body = true;
                ctx.session.user = res[0]["name"];
                ctx.session.id = res[0]["id"];
                console.log("登录成功");
            } else {
                ctx.body = false;
                console.log("用户名或密码错误!");
            }
        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/signout", async (ctx, next) => {
    ctx.session = "";
    ctx.user = "";
    ctx.body = true;
});
module.exports = router;
