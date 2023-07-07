const mongoose= require('mongoose');

//course schema
const courseSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    }
}, {
    //mongoose will keep record of 'createdAt' and 'updatedAt' by using timestamps
    timestamps: true
});

const Course= mongoose.model('Course', courseSchema);
module.exports= Course;