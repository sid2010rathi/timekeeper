const mongoose = require('mongoose');

const ContactUsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    emailId: {
        type: String
    },
    message: {
        type: String,
        unique: true
    },
}, {collection: 'contactus'}); 

const model = mongoose.model("ContactUsSchema", ContactUsSchema)

module.exports = model;