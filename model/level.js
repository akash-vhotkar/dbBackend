let mongoose = require('mongoose');

module.exports = mongoose.model('level', {
    name: {
        type: String
    },
    id: {
        type: String
    },
    mobile: {
        type: Number
    }, email: {
        type: String
    },
    lvl1: [],
    lvl2: [],
    lvl3: [],
    lvl4: [],
    lvl5: [],
    lvl6: [],
    lvl7: [],
    lvl8: [],
    lvl9: [],
    lvl10: [],
    lvl11: [],
    lvl12: [],
    lvl13: [],
    lvl14: [],
    lvl15: [],
    lvl16: [],
    lvl17: [],
    lvl18: [],
    lvl19: [],
    lvl20: [],
    lvl1sum: {
        type: Number,
        default: 0
    },
    lvl2sum: {
        type: Number,
        default: 0
    },
    lvl3sum: {
        type: Number,
        default: 0
    },
    lvl4sum: {
        type: Number,
        default: 0
    },
    lvl5sum: {
        type: Number,
        default: 0
    },
    lvl6sum: {
        type: Number,
        default: 0
    },
    lvl7sum: {
        type: Number,
        default: 0
    },
    lvl8sum: {
        type: Number,
        default: 0
    },
    lvl9sum: {
        type: Number,
        default: 0
    },
    lvl10sum: {
        type: Number,
        default: 0
    },
    lvl11sum: {
        type: Number,
        default: 0
    },
    lvl12sum: {
        type: Number,
        default: 0
    },
    lvl13sum: {
        type: Number,
        default: 0
    },
    lvl14sum: {
        type: Number,
        default: 0
    },
    lvl15sum: {
        type: Number,
        default: 0
    },
    lvl16sum: {
        type: Number,
        default: 0
    },
    lvl17sum: {
        type: Number,
        default: 0
    },
    lvl18sum: {
        type: Number,
        default: 0
    },
    lvl19sum: {
        type: Number,
        default: 0
    },
    lvl20sum: {
        type: Number,
        default: 0
    }
})