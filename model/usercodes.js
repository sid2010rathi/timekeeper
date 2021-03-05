const mongoose = require('mongoose')

var UserCodeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }

}, {collection: 'usercode'}); 

const model = mongoose.model("UserCodeSchema", UserCodeSchema)

module.exports = model;