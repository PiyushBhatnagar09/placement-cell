module.exports.home= function(req, res) {
    return res.render('user/home', {
        layout: 'user/layout',
        btn_text: 'Sign Out',
        form_action: '/users/sign-out'
    });
}