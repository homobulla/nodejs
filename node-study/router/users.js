const express = require('express')
const router = express.Router()

router.get('/:name', function(req, res) {
    // res.send('hello,' + req.params.name)
    // 通过调用render函数渲染ejs模板，会设置响应头中的Content-type:text/html
    res.render('users', {
        name: req.params.name
    })
})

module.exports = router
