const mongoose = require('mongoose')

const UserdetailsSchema = require('./userdetails').schema

const UserSchema = new mongoose.Schema({
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
    },
    userdetails: UserdetailsSchema
}, {collection: 'user'}); 

const model = mongoose.model("UserSchema", UserSchema)

module.exports = model;