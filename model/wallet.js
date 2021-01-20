let mongoose = require('mongoose');

module.exports = mongoose.model('wallet',{
    name:{
        type:String
    },
    id:{
        type:String
    },
    mobile:{
        type:String
    },
    walletBal:{
        type:Number,
        'default':0
    },
    directIncome:{
        type:Number,
        'default':0
    },
    levelIncome:{
        type:Number,
        'default':0
    },
    lastBal:{
        type:Number,
        'default':0
    },
    currentBal:{
        type:Number,
        'default':0
    },
    totalearning:{
        type:Number,
        'default':0
    },
    withdrawBal:{
        type:Number,
        'default':0
    }
})