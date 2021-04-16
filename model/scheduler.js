const mongoose = require('mongoose')

const Schedule = new mongoose.Schema({
    weeknumber: {
        type: Number
    },
    monday: 
    {
        date: {
            type: String
        },
        starttime: {
            type: String
        },
        endtime:{
            type: String
        }
    },
    tuesday: 
    {
        date: {
            type: String
        },
        starttime: {
            type: String
        },
        endtime:{
            type: String
        }
    },
    wednesday: 
    {
        date: {
            type: String
        },
        starttime: {
            type: String
        },
        endtime:{
            type: String
        }
    },
    thursday: 
    {
        date: {
            type: String
        },
        starttime: {
            type: String
        },
        endtime:{
            type: String
        }
    },
    friday: 
    {
        date: {
            type: String
        },
        starttime: {
            type: String
        },
        endtime:{
            type: String
        }
    },
    saturday: 
    {
        date: {
            type: String
        },
        starttime: {
            type: String
        },
        endtime:{
            type: String
        }
    },
    sunday: 
    {
        date: {
            type: String
        },
        starttime: {
            type: String
        },
        endtime:{
            type: String
        }
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
    weeks: [Schedule]
}, {collection: 'scheduler'}); 

const model = mongoose.model("SchedulerSchema", SchedulerSchema)

module.exports = model;