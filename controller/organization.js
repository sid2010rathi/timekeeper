const bcrypt = require('bcryptjs');
const Organization = require('../model/organization');
const User = require('../model/user');
const { sendMail } = require('../services/sendmail');
const { MAIL_SENDER, randomNumber } = require('../utility/utility');

const getOrganization = async function(req, res){
    await Organization.find({}).exec(function(err, data){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(data);
    })
    
};

const createOrganization = async function(req, res){
    //validate all request field, Username and Password made not required in model. So should be managed here
    const { password: plainTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword, 5); //Password Encryption
    await Organization.create({
        organizationName:req.body.organizationName,
        organizationWebsite: req.body.organizationWebsite,
        username: req.body.username,
        password: password
    }, async (err, data) => {
        if(err)
            res.status(400).json(err);
        else
        //Register User as Manager of Organization
            await User.create({
                username: data.username,
                password: password,
                role: "Manager"
            }, (err) => {
                if(err) {
                    throw err;
                } else {
                    const subject = "TimeKeeper: Verify Your Account";
                    const text = `This is your security code: ${randomNumber()}. Please verify your account.`;

                    sendMail(MAIL_SENDER, req.body.username, subject, text);
                }
            });
            res.status(200).json({status: 'ok', data});
    });
};

const getSingleOrganization = async function(req, res){
    if(req.params && req.params.organizationid){
        await Organization
            .findById(req.params.organizationid)
            .exec((err, organizationdata) => {
                if(!organizationdata){
                    res.status(404).json({"message" : "Data not found"});
                    return; 
                } else if(err){
                    res.status(404).json(err);
                    return;
                }
                res.status(200).json(organizationdata)
            });
        } else{
            res.status(404).json({"message":"ID not found"});
        }

};

const updateOrganization = async function(req, res){
    const _id = req.params.organizationid;
    if(!_id){
        res.status(404).json({"message" : "ID Not Found"});
        return;
    }
    await Organization.findOne({_id})
        .exec(async (err, data) =>{
            if(!data){
                res.status(404).json({"message" : "Organization not found"});
                return;
            } else if(err){
                res.status(404).json(err);
                return;
            }
            data.organizationName = req.body.organizationName,
            data.organizationType = req.body.organizationType,
            data.organizationSize = req.body.organizationSize,
            data.organizationWebsite = req.body.organizationWebsite,
            data.organizationStreet = req.body.organizationStreet,
            data.organizationCity = req.body.organizationCity,
            data.organizationZipcode = req.body.organizationZipcode,
            data.organizationProvince = req.body.organizationProvince,
            data.organizationCountry = req.body.organizationCountry,
            await data.save((err, data) => {
                if(err){
                    res.status(404).json(err);
                } else {
                    res.status(200).json(data);
                }
            });
        });
};


const deleteOrganization = async function(req, res){
    //when you delete organization delete its all belongings
    const _id = req.params.organizationid;
    if(_id){
        await Organization.findByIdAndRemove({_id})
        .exec((err, data) => {
            if(err){
                res.status(404).json(err);
                return;
            }
            res.status(204).json({"message" : "Deleted Successfully"});
        });
   } else{
       res.status(404).json({"message" : "No Organization Found"});
   }
};

module.exports ={
    getOrganization, 
    createOrganization,
    getSingleOrganization,
    updateOrganization,
    deleteOrganization
};