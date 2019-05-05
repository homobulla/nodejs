const http = require('http')
const server = http.createServer()
server.on('request', function(err, data) {
    console.log('服务器请求')
})
server.listen(3000, function() {
    console.log('localhost:3000')
})
