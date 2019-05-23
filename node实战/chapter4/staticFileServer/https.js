const https = require("https");
const fs = require("fs");

// SSL的密匙和证书
const option = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./key-cert.pem")
};

https
    .createServer(option, function(req, res) {
        res.writeHead(200);
        res.end("hello");
    })
    .listen(3000);
