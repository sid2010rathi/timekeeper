const mongoose = require('mongoose')

var UserCodeSchema = new mongoose.Schema({
    username: {
        type: String
    },
    userId: {
        type: String
    },
    code: {
        type: String
    },
    type: {
        type: String
    }

}, {collection: 'usercode'}); 

const model = mongoose.model("UserCodeSchema", UserCodeSchema)

module.exports = model;