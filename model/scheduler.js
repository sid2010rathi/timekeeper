const mongoose = require('mongoose')

const Schedule = new mongoose.Schema({
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
    weeknumber: {
        type: Number
    },
    entries: [Schedule]
}, {collection: 'scheduler'}); 

const model = mongoose.model("SchedulerSchema", SchedulerSchema)

module.exports = model;