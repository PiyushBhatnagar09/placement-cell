const Student= require('../models/student');
const Company= require('../models/company');
const Interview= require('../models/interview');
const Result= require('../models/result');

//redirecting user to add new interview page
module.exports.addInterviewPage= async function(req, res) {
    try {

        //getting the current date, so that no interview can be scheduled before the current date
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

//adding new interview details
module.exports.addInterview= async function(req, res) {
    try {
        var company= await Company.findOne({
            _id: req.body.company_id
        });
        var student= await Student.findOne({
            _id: req.body.student_id
        });
        var job_title= (req.body.job_title).toLowerCase();

        let interview= await Interview.create({
            company: company,
            job_title: job_title,
            student: student,
            date: req.body.date
        })

        student.interviews.push(interview);
        student.save();

        let result= await Result.create({
            company: company,
            student: student,
            result: "ON HOLD"
        });

        interview.result= result;
        interview.save();
        
        req.flash('success', 'Interview created successfully');
        return res.redirect('/');
    }catch(err) {
        req.flash('Error: ', err);
        return res.redirect('/');
    }
}

//deleting an interview
module.exports.deleteInterview= async function(req, res) {
    try {
        var interview= await Interview.findById(req.params.id);
        await Interview.findByIdAndDelete(req.params.id);

        //removing that interview from student object as well
        await Student.findByIdAndUpdate(interview.student, { $pull: {interviews: req.params.id}});

        req.flash('success', 'Interview deleted successfully');
        return res.redirect('/');
    }catch(err) {
        req.flash('Error: ', err);
        return res.redirect('/');
    }
}

//redirecting user to external jobs page
module.exports.externalJobs= async function(req, res) {
    return res.render('interview/external_jobs', {
        layout: 'interview/layout',
        btn_text: 'Sign Out',
        form_action: '/users/sign-out',
    })
}

//adding result of an interview
module.exports.addResult= async function(req, res) {
    try {
        var interview= await Interview.findById(req.params.id);
        var result= await Result.findOne({
            company: interview.company,
            student: interview.student
        });

        result.result= req.body.result;
        result.save();

        interview.result= result;
        interview.save();

        req.flash('success', 'Result added successfully');
        return res.redirect('back');
    }catch(err) {
        console.log(err);
        return res.redirect('back');
    }
}