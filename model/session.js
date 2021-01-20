let mongoose = require('mongoose');

module.exports = mongoose.model('session',{
    userId:{
        type:String
    },
    time:{
        type:Number
    },
    Son:{
        type:Boolean
    }
})