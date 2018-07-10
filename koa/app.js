const Koa = require('koa');
const nunjucks = require('nunjucks');
const app = new Koa();




function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});
var s = env.render('hello.html', {
    name: '<Nunjucks>',
    food: {a:'111',b:'ddd'},
    count: 12000
});

// function myrender(obj) {
//     return env.render('hello.html', {
//         list: obj
//     })
// }
const main = ctx => {
    var obj = ctx.request;
    ctx.response.body = ctx.request;
  };
  
app.use(main);
app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});
