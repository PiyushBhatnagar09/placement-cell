const Company= require('../models/company');

module.exports.addCompany= async function(req, res) {
    try {
        var name= (req.body.company).toUpperCase();
        console.log(name);
        Company.create({
            name: name
        });

        req.flash('success', 'Company added successfully');
        return res.redirect('/');
    }catch(err) {
        console.log('hey');
        req.flash('error', err);
        return res.redirect('/');
    }
}