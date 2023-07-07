const mongoose= require('mongoose');

//result schema
const resultSchema= new mongoose.Schema({ //employee
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    result: {
        type: String,
        required: true,
        default: "ON HOLD"
    }
}, {
    //mongoose will keep record of 'createdAt' and 'updatedAt' by using timestamps
    timestamps: true
});

const Result= mongoose.model('Result', resultSchema);
module.exports= Result;