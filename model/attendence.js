const mongoose = require('mongoose')

const PunchInOut = new mongoose.Schema({
    date: {
        type: Date
    },
    inTime:{
        type: Date
    },
    outTime:{
        type: Date
    }
})

const AttendenceSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true
    },
    organizationid: {
        type: String,
        required: true
    },
    punch: [{
        date: {
            type: Date
        },
        inTime:{
            type: Date
        },
        outTime:{
            type: Date
        }
    }],
    workedHours: {
        type: Number,
        required: true,
        default: 0
    }
}, {collection: 'attendence'}); 

const model = mongoose.model("AttendenceSchema", AttendenceSchema)

module.exports = model;