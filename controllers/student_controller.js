const Student= require('../models/student');
const Course= require('../models/course');

module.exports.addStudentPage= function(req, res) {
    return res.render('student/newStudentForm', {
        layout: 'student/layout',
        btn_text: 'Sign Out',
        form_action: '/users/sign-out',
    });
}
module.exports.addStudent= async function(req, res) {
    try {
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

        let student= await Student.create({
            name: req.body.name,
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

module.exports.profile= async function(req, res) {
    try {
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
        console.log(student);
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

const objectstocsv= require('objects-to-csv');
const fs= require('fs');
const ObjectsToCsv = require('objects-to-csv');

module.exports.downloadCSV= async function(req, res) {
    try {
        console.log('fndd', req.params.id);
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
        console.log(student._id, student.courses, student.interviews);
        const data= [
            {
                name: student.name,
                email: student.email,
                batch: student.batch,
                college: student.college,
                status: student.status,
                courses: student.courses,
                interviews: student.interviews
            }
        ]

        const csv= new ObjectsToCsv(data);
        await csv.toDisk(`./${student.name}.csv`);

        console.log('PRINTING: ');
        console.log(await csv.toString());
        return res.download(`./${student.name}.csv`, ()=> {
            fs.unlinkSync(`./${student.name}.csv`)
        })
        // return res.render('student/profile', {
        //     layout: 'student/layout',
        //     btn_text: 'Sign Out',
        //     form_action: '/users/sign-out',
        //     student: student
        // });
    }catch(err) {
        console.log(err);
    }
}