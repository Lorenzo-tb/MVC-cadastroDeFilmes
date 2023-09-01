function auth(req, res, next) {
    console.log(req.session.token);
    if (req.session.token) {
        next();
    } else {
        console.log("falso");
        res.redirect('/login');
    }
}

module.exports = { auth };