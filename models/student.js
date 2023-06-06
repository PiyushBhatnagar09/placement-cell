const mongoose= require('mongoose');

//using multer to store files from user
const multer= require('multer');
const path= require('path');
const AVATAR_PATH= path.join('/uploads/students/avatars');

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
    avatar: {
        type: String
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

let storage= multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname+ '-'+ Date.now());
    }
});

//static methods/functions
studentSchema.statics.uploadedAvatar= multer({storage: storage}).single('avatar');
studentSchema.statics.avatarPath= AVATAR_PATH;

const Student= mongoose.model('Student', studentSchema);
module.exports= Student;