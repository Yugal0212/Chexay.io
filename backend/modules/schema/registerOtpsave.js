const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email:{
        type : 'string',
        required : true,
        unique : true
    },
    otp:{
        type : 'number',
        required : true,
    }
},{timestamp:true})

module.exports = mongoose.model('verifyOtpTemps', schema);