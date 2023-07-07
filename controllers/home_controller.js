let Student= require('../models/student');
let Interview= require('../models/interview');
const Company = require('../models/company');

//redirects user to home page
module.exports.home= async function(req, res) {
    //getting all the students data from database
    let students= await Student.find()
    .populate({
        path: 'interviews',
        populate: {
            path: 'company',
            populate: {
                path: 'name'
            }
        }
    })
    .populate({
        path: 'interviews',
        populate: {
            path: 'date'
        }
    });

    //getting all the interviews data from database
    let interviews= await Interview.find()
    .populate({
        path: 'company',
        populate: {
            path: 'name'
        }
    })
    .populate({
        path: 'student',
        populate: {
            path: 'name'
        }
    })
    .populate({
        path: 'result'
    });

    //getting all the companies data from database
    let companies= await Company.find();

    return res.render('user/home', {
        layout: 'user/layout',
        btn_text: 'Sign Out',
        form_action: '/users/sign-out',
        students: students,
        interviews: interviews,
        companies: companies
    });
}