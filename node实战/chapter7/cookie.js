/**
 *
 */

const cookieParser = require("cookie-parser");
const connect = require("connect");
let app = connect()
    .use(cookieParser("tobi is a cool ferret"))
    .use(function(req, res) {
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end();
    })
    .listen(3000);
