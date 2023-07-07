const mongoose= require('mongoose');

//interview schema
const interviewSchema= new mongoose.Schema({ //employee
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    job_title: {
        type: String,
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result',
    }
}, {
    //mongoose will keep record of 'createdAt' and 'updatedAt' by using timestamps
    timestamps: true
});

const Interview= mongoose.model('Interview', interviewSchema);
module.exports= Interview;