module.exports.home= function(req, res) {
    return res.render('home');
}
module.exports.createAbha= function(req, res) {
    return res.render('verifyAadhaar');
}
module.exports.loginAbha= function(req, res) {
    return res.render('loginAbha');
}