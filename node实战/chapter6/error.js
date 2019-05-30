/**
 * 中间件的错误处理
 */

module.exports = function errHandler() {
    let env = process.env.NODE_ENV || "development";
    return function(err, req, res, next) {
        res.statusCode = 500;
        switch (env) {
            case "development":
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(err));
                break;
            default:
                res.end("Server error.");
        }
    };
};
