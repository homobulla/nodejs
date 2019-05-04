const http = require('http')
const server = http.createServer()

server.on('request', function(req, res) {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end('你好')
})
server.listen(3000, function() {
    console.log('服务启动')
})
