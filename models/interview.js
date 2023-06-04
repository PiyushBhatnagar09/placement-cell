const mongoose= require('mongoose');

const interviewSchema= new mongoose.Schema({ //employee
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    //mongoose will keep record of 'createdAt' and 'updatedAt' by using timestamps
    timestamps: true
});

const Interview= mongoose.model('Interview', interviewSchema);
module.exports= Interview;