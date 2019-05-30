/**
 * 可配置的log日志中间件
 * date:2019-05-30
 * @param {string}
 * demo setup(':url :method')
 */

function setup(format) {
    let regexp = /:(\w+)/g;
    return function logger(req, res, next) {
        let str = format.replace(regexp, function(match, property) {
            return req[property];
        });
        console.log(str);
        next();
    };
}

module.exports = setup;
