const mongoose = require('mongoose')

var OrganizationSchema = new mongoose.Schema({
    organizationName: {
        type: String, 
        required: true,
        min:3
    },
    organizationType: {
        type: String, 
        required: true,
        min:3
    },
    organizationSize: {
        type: Number,
        required: true
    },
    organizationWebsite: {
        type: String,
        required: true
    },
    organizationStreet: {
        type: String,
        required: true
    },
    organizationCity: {
        type: String,
        required: true
    },
    organizationZipcode: {
        type: String,
        required: true
    },
    organizationProvince: {
        type: String,
        required: true
    },
    organizationCountry: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }

}, {collection: 'organization'}); 

const model = mongoose.model("OrganizationSchema", OrganizationSchema)

module.exports = model;