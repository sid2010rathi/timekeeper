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
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    organizationId: {
        type: String
    }

}, {collection: 'user'}); 

const model = mongoose.model("UserSchema", UserSchema)

module.exports = model;