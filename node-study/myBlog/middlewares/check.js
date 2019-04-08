module.exports = {
    checkLogin(req, next) {
        if (!req.session.user) {
            req.flash(error, '未登录')
        }
        next()
    },
    checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录')
            return res.redirect('back') // 返回之前的页面若登录
        }
        next()
    }
}
