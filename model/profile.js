let mongoose = require('mongoose');

module.exports = mongoose.model('profile', {
    name: {
        type: String
    },
    mobile: {
        type: Number
    },// joining date
    // activation date
    // package 
    // 
    // 5 10 20 40
    // 
    joining_date: {
        type: Date,
    },
    activation_date: {
        type: Date
    },
    packages: {
        type: Number
    },
    id: {
        type: String
    },
    email: {
        type: String
    },
    sponserName: {
        type: String
    },
    sponserId: {
        type: String
    },
    aadharno: {
        type: Number
    },
    panNo: {
        type: String
    },
    direct: {
        type: Number,
        'default': 0
    },
    lvlNo: {
        type: Number,
        'default': 0
    },
    motherName: {
        type: String
    },
    fatherName: {
        type: String
    },
    Gender: {
        type: String
    },
    occupation: {
        type: String
    },
    maritalStatus: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: String
    },
    status: {
        type: String,
        'default': 'inactive'
    },
    joiningDate: {
        type: String
    },
    activationDate: {
        type: String
    },
    ancestors: [],
    welCall: {
        type: Boolean,
        'default': 'false'
    },
    aadhar: String,
    aadharStat: {
        type: Boolean,
        'default': 'false'
    },
    aadharBack: String,
    aadharBackStat: {
        type: Boolean,
        'default': 'false'
    },
    pan: String,
    panStat: {
        type: Boolean,
        'default': 'false'
    },
    sign: String,
    signStat: {
        type: Boolean,
        'default': 'false'
    },
    photo: String,
    photoStat: {
        type: Boolean,
        'default': 'false'
    },
    statement: {
        type: Boolean,
        'default': 'false'
    },
    addresProof: String,
    addresProofStat: {
        type: Boolean,
        'default': 'false'
    },
    formStat: {
        type: Boolean,
        'default': 'false'
    },
    annualIncome: {
        type: String
    },
    OthOc: {
        type: String
    },
    incomePType: {
        type: String
    },
    addressPType: {
        type: String
    },
    dob: {
        type: Date
    },
    int: {
        type: Boolean,
        'default': 'true'
    }
})