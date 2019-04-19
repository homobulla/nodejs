let fn_hello = async (ctx, next) => {
    let name = ctx.params.name || "游客";
    ctx.response.body = `<h1>hello,${name}!</h1>`;
};

module.exports = {
    "GET /hello/:name": fn_hello
};
