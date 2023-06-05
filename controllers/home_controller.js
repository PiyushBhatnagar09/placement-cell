let Student= require('../models/student');
let Interview= require('../models/interview');

module.exports.home= async function(req, res) {
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
    });

    console.log(students);
    return res.render('user/home', {
        layout: 'user/layout',
        btn_text: 'Sign Out',
        form_action: '/users/sign-out',
        students: students,
        interviews: interviews
    });
}