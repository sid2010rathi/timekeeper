const bcrypt = require('bcryptjs');
const ContactUs = require('../model/contactus');

const createContact = async function(req, res){
    //validate all request field, Username and Password made not required in model. So should be managed here
    await ContactUs.create({
        name:req.body.name,
        emailId: req.body.emailId,
        message: req.body.message
    }, async (err, data) => {
        if(err) {
            res.status(400).json(err);
            throw err;
        }
        else {
            //Register User as Manager of Organization
            return res.status(200).json({status: 'ok', data});
        }
    });
};

module.exports ={
    createContact
};