const mongoose = require('mongoose')

const UserdetailsSchema = new mongoose.Schema({
    phone: {
        type: Number,
        unique: true
    },
    street: {
        type: String
    },
    city: {
        type: String,
    },
    zipcode: {
        type: String
    },
    province: {
        type: String
    },
    country: {
        type: String
    }
}, {collection: 'userdetails'});

const model = mongoose.model("UserdetailsSchema", UserdetailsSchema)

module.exports = model;