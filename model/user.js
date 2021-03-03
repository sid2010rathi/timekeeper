const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }

}, {collection: 'user'}); 

const model = mongoose.model("UserSchema", UserSchema)

module.exports = model;