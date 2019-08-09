const router = require("koa-router")();
const userModel = require("../lib/mysql");
const moment = require("moment");
const { checkNotLogin, checkLogin } = require("../middlewares/check");
const md = require("markdown-it")();
const colors = require("colors");
const app = require("../index");

// 重置到文章页
router.get("/", async (ctx, next) => {
    ctx.redirect("/posts");
});

// 文章
router.get("/posts", async (ctx, next) => {
    let res,
        postsLength,
        name = decodeURIComponent(ctx.request.querystring.split("=")[1]);
    if (ctx.request.querystring) {
        await userModel.findDataByUser(name).then(result => {
            postsLength = result.length;
        });
        await userModel.findPostByUserPage(name, 1).then(result => {
            res = result;
        });
        await ctx.render("selfPosts", {
            session: ctx.session,
            posts: res,
            postsPageLength: Math.ceil(postsLength / 10)
        });
    } else {
        await userModel.findPostByPage(1).then(result => {
            res = result;
        });
        await userModel.findAllPost().then(result => {
            postsLength = result.length;
        });
        await ctx.render("posts", {
            session: ctx.session,
            posts: res,
            postsLength: postsLength,
            postsPageLength: Math.ceil(postsLength / 10)
        });
    }
});

// 首页文章默认十条
router.post("/posts/page", async (ctx, next) => {
    let page = ctx.request.body.page;
    await userModel
        .findPostByPage(page)
        .then(result => {
            ctx.body = result;
        })
        .catch(err => {
            ctx.body = "error";
        });
});

// 个人文章分页 默认十条
router.post("/posts/self/page", async (ctx, next) => {
    let { name, page } = ctx.request.body;
    await userModel
        .findPostByUserPage(name, page)
        .then(res => {
            ctx.body = res;
        })
        .catch(err => {
            ctx.body = err;
        });
});

// 单篇文章详情
router.get("/posts/:postId", async (ctx, next) => {
    let comment_res, res, pageOne, res_pv;

    await userModel.findDataById(ctx.params.postId).then(result => {
        res = result;
        res_pv = parseInt(res[0].pv);
        res_pv++;
    });

    await userModel.updatePostPv(res_pv, ctx.params.postId);
    await userModel.findCommentByPage(1, ctx.params.postId).then(result => {
        pageOne = result; // 第一页数数据永远是
    });
    await userModel.findCommentById(ctx.params.postId).then(result => {
        comment_res = result;
    });
    await ctx.render("sPost", {
        session: ctx.session,
        posts: res[0],
        commentLenght: comment_res.length,
        commentPageLenght: Math.ceil(comment_res.length / 10),
        pageOne: pageOne
    });
});

// 发表文章页面
router.get("/create", async (ctx, next) => {
    await ctx.render("create", {
        session: ctx.session
    });
});

// 发表文章接口
router.post("/create", async (ctx, next) => {
    let { title, content } = ctx.request.body,
        name = ctx.session.user,
        time = moment().format("YYYY-MM-DD HH:mm:ss"),
        avator;
    // 获取用户头像
    await userModel.findDataByUser(name).then(res => {
        avator = res[0].avator;
    });
    await userModel
        .insertPost([name, title, content, "", "", time, avator])
        .then(res => {
            ctx.body = true;
        })
        .catch(err => {
            ctx.body = false;
        });
});

// 发表评论
router.post("/:postId", async (ctx, next) => {
    let name = ctx.session.user,
        content = ctx.request.body.content,
        postId = ctx.params.postId,
        res_comments,
        time = moment().format("YYYY-MM-DD HH:mm:ss"),
        avator,
        person,
        url = ctx.request.header.referer;
    // 获取用户头像
    await userModel.findUserData(ctx.session.user).then(res => {
        avator = res[0].avator;
    });
    // 写入数据
    await userModel.insertComment([name, md.render(content), time, postId, avator]);

    await userModel.findDataById(postId).then(result => {
        res_comments = parseInt(result[0]["comments"]);
        res_comments += 1;
        person = result[0].name;
    });
    await userModel
        .updatePostComment([res_comments, postId])
        .then(() => {
            console.log(colors.green("这里会触发几次"));
            //  user 评论人 person发帖人即需要通知的人
            if (ctx.session.user != person) {
                app.io.emit("comment", { user: ctx.session.user, person, url });
            }
            ctx.body = true;
        })
        .catch(err => {
            console.log(err);
            ctx.body = false;
        });
});

// 评论分页
router.post("/posts/:postId/commentPage", async (ctx, next) => {
    let postId = ctx.params.postId,
        page = ctx.request.body.page;
    await userModel
        .findCommentByPage(postId, page)
        .then(res => {
            ctx.body = res;
        })
        .catch(err => {
            ctx.body = err;
        });
});

// 删除文章
router.post("/posts/:postId/remove", async (ctx, next) => {
    let { postId } = ctx.params;
    await userModel
        .deletePost(postId)
        .then(res => {
            ctx.body = {
                data: 1
            };
        })
        .catch(err => {
            ctx.body = {
                data: 2
            };
        });
});
// 删除评论
router.post("/posts/:postId/comment/:commentId/remove", async (ctx, next) => {
    let { postId, commentId } = ctx.params;
    let account;
    // 删评论
    await userModel.deletComment(commentId);
    // 获取当前评论数
    await userModel.findDataById(postId).then(res => {
        account = --res[0].comments < 0 ? 0 : --res[0].comments;
    });

    // 评论数修改 -1
    await userModel
        .updatePostComment([account, postId])
        .then(_ => {
            ctx.body = {
                data: 1
            };
        })
        .catch(_ => {
            ctx.body = {
                data: 2
            };
        });
});

// 编辑文章:路由
router.get("/posts/:postId/edit", async (ctx, next) => {
    let name = ctx.session.user,
        postId = ctx.params.postId,
        res;
    await userModel.findDataById(postId).then(result => {
        res = result[0];
    });
    await ctx.render("edit", {
        session: ctx.session,
        postsContent: res.content,
        postsTitle: res.title
    });
});

// 编辑文章:修改
router.post("/posts/:postId/edit", async (ctx, next) => {
    let id = ctx.params.postId,
        { title, content } = ctx.request.body;
    await userModel
        .editPost([title, content, id])
        .then(res => {
            ctx.body = true;
        })
        .catch(err => {
            console.log(err);
            ctx.body = false;
        });
});
module.exports = router;
