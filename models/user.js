const mongoose= require('mongoose');

//user schema
const userSchema= new mongoose.Schema({ //employee
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    }
}, {
    //mongoose will keep record of 'createdAt' and 'updatedAt' by using timestamps
    timestamps: true
});

const User= mongoose.model('User', userSchema);
module.exports= User;