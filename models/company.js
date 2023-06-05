const mongoose= require('mongoose');

const companySchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    //mongoose will keep record of 'createdAt' and 'updatedAt' by using timestamps
    timestamps: true
});

const Company= mongoose.model('Company', companySchema);
module.exports= Company;