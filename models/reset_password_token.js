const mongoose= require('mongoose');

//schema for reset password token
const resetPasswordTokenSchema= new mongoose.Schema({
    accessToken: {
            type: String,
            required: true
    },
    isValid: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const RPT= mongoose.model('RPT', resetPasswordTokenSchema);
module.exports= RPT;
//RPT is reset password token