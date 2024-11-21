const mongoose = require('mongoose');

const schema = new mongoose.Schema({
        participants:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'logins'
            },
        ],
        messages:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'massages',
                default:[],
            },
        ],
    },
    {timestamps:true}
);

module.exports = mongoose.model('conversations', schema); 
