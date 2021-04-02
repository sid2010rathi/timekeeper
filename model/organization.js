const mongoose = require('mongoose')

var OrganizationSchema = new mongoose.Schema({
    organizationName: {
        type: String, 
        required: true,
        min:3
    },
    organizationType: {
        type: String
    },
    organizationSize: {
        type: Number
    },
    organizationWebsite: {
        type: String,
        required: true
    },
    organizationStreet: {
        type: String
    },
    organizationCity: {
        type: String,
    },
    organizationZipcode: {
        type: String
    },
    organizationProvince: {
        type: String
    },
    organizationCountry: {
        type: String
    },
    organizationPhone: {
        type: Number
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }

}, {collection: 'organization'}); 

const model = mongoose.model("OrganizationSchema", OrganizationSchema)

module.exports = model;