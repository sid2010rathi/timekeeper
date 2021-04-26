const mongoose = require('mongoose')

const Schedule = new mongoose.Schema({
    weeknumber: {
        type: Number
    },
    day:{
        type: String
    },
    starttime: {
        type: String
    },
    endtime: {
        type: String
    }
})

const SchedulerSchema = new mongoose.Schema({
    assigner: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
        required: true
    },
    entries: [Schedule]
}, {collection: 'scheduler'}); 

const model = mongoose.model("SchedulerSchema", SchedulerSchema)

module.exports = model;