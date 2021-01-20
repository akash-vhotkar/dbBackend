let mongoose = require('mongoose');

module.exports = mongoose.model('callQuery',{
    userId:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    language:{
        type:String
    },
    mailR:{
        type:String
    },
    login:{
        type:String
    },
    platform:{
        type:String
    },
    queryT:{
        type:String
    },
    query:{
        type:String
    },
    referF:{
        type:String
    }
})