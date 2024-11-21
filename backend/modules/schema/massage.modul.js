const mongoose = require('mongoose');

const schema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'logins',
        required : true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'logins',
        required : true
    },
    message:{
        type:String,
        required : true
    }
},{timestamps:true});

module.exports = mongoose.model('massages', schema);