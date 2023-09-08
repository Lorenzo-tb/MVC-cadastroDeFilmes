function gethome(req, res, next){//get
    res.render("homeView", null);
}

module.exports = {gethome};