const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    referalname: {
        type: String,
        required: false
    },
    referalID: {
        type: String,
        required: false
    }

})
module.exports = mongoose.model('userdata', schema);
