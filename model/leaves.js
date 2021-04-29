const mongoose = require('mongoose')

const LeaveSchema = new mongoose.Schema({
    userid: {
        type: String,
    },
    username: {
        type: String,
    },
    fromDate: {
        type: String
    },
    toDate: {
        type: String
    },
    status: {
        type: String
    },
    reason: {
        type: String
    }
    
}, {collection: 'leaves'}); 

const model = mongoose.model("LeaveSchema", LeaveSchema)

module.exports = model;