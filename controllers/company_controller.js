//using required models
const Student= require('../models/student');
const Company= require('../models/company');
const Interview = require('../models/interview');

//function to add company
module.exports.addCompany= async function(req, res) {
    try {
        var name= (req.body.company).toUpperCase();
        var company= await Company.findOne({
            name: name
        })

        //checking if company already exists or not
        if(company) {
            req.flash('error', 'Company already exists in database');
            return res.redirect('/');
        }

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

//deleting a company
module.exports.deleteCompany= async function(req, res) {
    try {
        let company= await Company.findById(req.params.id);
        await Company.findByIdAndDelete(req.params.id);

        //updating all the interviews of students with this company
        var ids=[];
        let students= await Student.find()
        .populate({
            path: 'interviews',
            populate: {
                path: 'company',
            }
        });

        for(st of students) {
            for(it of st.interviews) {
                if(it.company==company) {
                    ids.push(st);
                    await Student.findByIdAndUpdate(st, { $pull: {interviews: it._id}});
                }
            }
        }

        //deleting all the interviews scheduled with this company
        var Is= await Interview.find({
            company: company
        })
        for(iis of Is) {
            await Interview.findByIdAndDelete(iis._id);
        }

        req.flash('success', 'Company deleted successfully');
        return res.redirect('/');
    }catch(err) {
        req.flash('error', err);
        return res.redirect('/');
    }
}