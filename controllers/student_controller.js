const Student= require('../models/student');
const Course= require('../models/course');
const fs= require('fs');
const ObjectsToCsv = require('objects-to-csv');
const Interview = require('../models/interview');
const path= require('path');

//redirecting user to add new student page
module.exports.addStudentPage= function(req, res) {
    return res.render('student/newStudentForm', {
        layout: 'student/layout',
        btn_text: 'Sign Out',
        form_action: '/users/sign-out',
    });
}

//function to add new student
module.exports.addStudent= async function(req, res) {
    try {

        //getting marks of the new student
        var dsa= await Course.create({
            name: 'DSA',
            score: req.body.dsa_score
        });
        var webd= await Course.create({
            name: 'WEBD',
            score: req.body.dsa_score
        });
        var react= await Course.create({
            name: 'REACT',
            score: req.body.dsa_score
        });


        var name= (req.body.name).toUpperCase();
        let student= await Student.create({
            name: name,
            email: req.body.email,
            batch: req.body.batch,
            college: req.body.college,
            status: req.body.status
        })

        student.courses.push(dsa);
        student.courses.push(webd);
        student.courses.push(react);
        student.save();

        return res.redirect('/');
    }catch(err) {
        req.flash('Error: ', err);
        return res.redirect('/');
    }
}

//redirecting user to student's profile page
module.exports.profile= async function(req, res) {
    try {

        //getting the student data using his id
        var student= await Student.findOne({
            _id: req.params.id
        })
        .populate({
            path: 'courses',
            populate: {
                path: 'name score',
            },
        })
        .populate({
            path: 'interviews',
            populate: {
                path: 'company',
                populate: {
                    path: 'name'
                }
            }
        })

        if(student) {
            return res.render('student/profile', {
                layout: 'student/layout',
                btn_text: 'Sign Out',
                form_action: '/users/sign-out',
                student: student
            });
        }
        else {
            req.flash('error', 'Student not found');
            return res.redirect('/');
        }
    }catch(err) {

    }
}

module.exports.downloadCSV= async function(req, res) {
    console.log('reaced here');
    try {
        console.log('here');
        var students= await Student.find()
        .populate({
            path: 'courses',
            populate: {
                path: 'name score',
            },
        })
        .populate({
            path: 'interviews',
            populate: {
                path: 'company',
                populate: {
                    path: 'name'
                }
            },
            populate: {
                path: 'result'
            }
        })
        console.log('Prinitng students: ', students);

        const data= [];
        for(s of students) {
            var c= s.courses;
            var dsa, webd, react;
            for(ci of c) {
                console.log(ci);
                if(ci.name=='DSA') {
                    dsa= ci.score;
                }
                if(ci.name=='WEBD') {
                    webd= ci.score;
                }
                if(ci.name=='REACT') {
                    react= ci.score;
                }
            }

            for(i of s.interviews) {
                var st= {
                    name: s.name,
                    email: s.email,
                    batch: s.batch,
                    college: s.college,
                    status: s.status,
                    DSA_score: dsa,
                    WEBD_score: webd,
                    REACT_score: react,
                    company: i.company.name,
                    date: i.date,
                    result: i.result.result
                };
                data.push(st);
            }
        }

        const csv= new ObjectsToCsv(data);
        await csv.toDisk(`DetailsInCSVformat.csv`);

        console.log(await csv.toString());
        return res.download(`DetailsInCSVformat.csv`, ()=> {
            fs.unlinkSync(`DetailsInCSVformat.csv`)
        })
    }catch(err) {
        console.log(err);
        return res.redirect('/');
    }
}

module.exports.deleteStudent= async function(req, res) {
    try {
        console.log(req.params.id);
        var student= await Student.findById(req.params.id);
        await Student.findByIdAndDelete(req.params.id);

        var Is= await Interview.find({
            student: student
        })
        for(iis of Is) {
            await Interview.findByIdAndDelete(iis._id);
        }
        req.flash('success', 'Student deleted successfully');
        return res.redirect('/');
    }catch(err) {
        console.log(err);
        return res.redirect('/');
    }
}

module.exports.update= async function(req, res) {
    try {
        console.log('INside updattt');
        let student= await Student.findById(req.params.id);
        Student.uploadedAvatar(req, res, function(err) {
            if(err) {
                console.log('****Multer Error: ', err);
            }

            if(req.file) {
                console.log(student.avatar);
                if(student.avatar && fs.existsSync(path.join(__dirname, '..', student.avatar))) {
                    console.log(true);
                    fs.unlinkSync(path.join(__dirname, '..', student.avatar));
                }

                console.log('here');
                //this is saving the path of the uploaded file into the avatar field in the user
                student.avatar= Student.avatarPath+'/'+req.file.filename;
            }
            student.save();
            console.log('oyy');
            req.flash('success', 'Profile photo updated');
            return res.redirect('back');
        })
    }catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}