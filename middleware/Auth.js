function Auth(req, res, next) {
    if (req.session.User != undefined) {
        next()
    }else {
        res.render("login")
    }
}

export default Auth