const mongoose = require('mongoose');

const schema = mongoose.Schema({
    Username: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'logins',
        required : true
    },
    friendList:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'logins',
        default:[],
    }
},{timestamps:true})

module.exports = mongoose.model('friends', schema);