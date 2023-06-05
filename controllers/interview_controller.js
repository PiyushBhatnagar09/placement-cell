const Student= require('../models/student');
const Company= require('../models/company');
const Interview= require('../models/interview');

module.exports.addInterviewPage= async function(req, res) {
    try {
        var companies= await Company.find();
        var students= await Student.find();

        return res.render('interview/newInterviewPage', {
            layout: 'interview/layout',
            btn_text: 'Sign Out',
            form_action: '/users/sign-out',
            companies: companies,
            students: students
        });
    }catch(err) {

    }
}

module.exports.addInterview= async function(req, res) {
    try {
        var company= await Company.findOne({
            _id: req.body.company_id
        });
        var student= await Student.findOne({
            _id: req.body.student_id
        });

        let interview= await Interview.create({
            company: company,
            student: student,
            date: req.body.date
        })

        student.interviews.push(interview);
        student.save();
        
        req.flash('success', 'Interview created successfully');
        return res.redirect('/');
    }catch(err) {
        req.flash('Error: ', err);
        return res.redirect('/');
    }
}
