const connect = require("connect");
const bodyParser = require("body-parser");
connect()
    .use(bodyParser.json())
    .use(function(req, res) {
        console.log(res.files);
        res.end("end");
    })
    .listen(4000);
