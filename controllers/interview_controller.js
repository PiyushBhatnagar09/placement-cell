const Student= require('../models/student');
const Company= require('../models/company');
const Interview= require('../models/interview');

module.exports.addInterviewPage= async function(req, res) {
    try {
        var currentdate = new Date(); 

        var year= currentdate.getFullYear();
        var month=  parseInt(currentdate.getMonth()+1);
        if(month<10) {
            month= "0"+month;
        }
        var date= currentdate.getDate();
        if(date<10) {
            date= "0"+date;
        }
        date= year+'-'+month+'-'+date;
        console.log(date);

        var companies= await Company.find();
        var students= await Student.find();

        return res.render('interview/newInterviewPage', {
            layout: 'interview/layout',
            btn_text: 'Sign Out',
            form_action: '/users/sign-out',
            companies: companies,
            students: students,
            currentdate: date
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

module.exports.deleteInterview= async function(req, res) {
    try {
        var interview= await Interview.findById(req.params.id);
        await Interview.findByIdAndDelete(req.params.id);
        await Student.findByIdAndUpdate(interview.student, { $pull: {interviews: req.params.id}});
        req.flash('success', 'Interview deleted successfully');
        return res.redirect('/');
    }catch(err) {
        req.flash('Error: ', err);
        return res.redirect('/');
    }
}

const fetch= require('node-fetch');
module.exports.externalJobs= async function(req, res) {
    return res.render('interview/external_jobs', {
        layout: 'interview/layout',
        btn_text: 'Sign Out',
        form_action: '/users/sign-out',
    })
}