const mongoose = require('mongoose')

const Schedule = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true
    }
})

const SchedulerSchema = new mongoose.Schema({

    assignee: {
        type: String,
        required: true
    },
    assigner: {
        type: String,
        required: true
    },
    schedule: [Schedule]
}, {collection: 'scheduler'}); 

const model = mongoose.model("SchedulerSchema", SchedulerSchema)

module.exports = model;