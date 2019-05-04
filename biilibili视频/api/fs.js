var fs = require('fs')
fs.readFile('./homos.md', function(err, data) {
    if (err) {
        console.log(err)
        return
    }
    console.log('写入成功')
})
