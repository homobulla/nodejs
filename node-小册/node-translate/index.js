const request = require("request");
request("https://www.baidu.com", function(err, response, body) {
    if (!err && response.statusCode == 200) {
        console.log(body); // 输出请求到的body
    }
});
