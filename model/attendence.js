const mongoose = require('mongoose')

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
        week: {
            type: Number,
            required: true,
            default: 0
        },
        date: {
            type: String
        },
        inTime:{
            type: String
        },
        outTime:{
            type: String
        },
        workedHours: {
            type: String
        }
    }]
}, {collection: 'attendence'}); 

const model = mongoose.model("AttendenceSchema", AttendenceSchema)

module.exports = model;