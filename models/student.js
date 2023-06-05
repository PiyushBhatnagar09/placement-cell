const mongoose= require('mongoose');

const studentSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    interviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview'
        }
    ]
}, {
    //mongoose will keep record of 'createdAt' and 'updatedAt' by using timestamps
    timestamps: true
});

const Student= mongoose.model('Student', studentSchema);
module.exports= Student;