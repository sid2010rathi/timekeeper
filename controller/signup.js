const bcrypt = require('bcryptjs');
const Organization = require('../model/organization');

const getOrganization = async function(req, res){
    await Organization.find().exec(function(err, data){
        if(err){
            res
            .status(404)
            .json(err);
        return;
        }
        res
        .status(200)
        .json(data);
    })
    
};

const createOrganization = async function(req, res){
    const {password: plainTextPassword} = req.body;
    const password = await bcrypt.hash(plainTextPassword, 5); //Password Encryption
    await Organization.create({
        organizationName:req.body.organizationName,
        organizationType:req.body.organizationType,
        organizationSize: req.body.organizationSize,
        organizationWebsite: req.body.organizationWebsite,
        organizationStreet: req.body.organizationStreet,
        organizationCity: req.body.organizationCity,
        organizationZipcode: req.body.organizationZipcode,
        organizationProvince: req.body.organizationProvince,
        organizationCountry: req.body.organizationCountry,
        username: req.body.username,
        password: password
    }, (err, data) => {
        if(err){
            res
            .status(400)
            .json(err);
        }else{
            res
            .status(200)
            .json(data);
        }
    });
};

const getSingleOrganization = async function(req, res){
    if(req.params && req.params.organizationid){
        await Organization
            .findById(req.params.organizationid)
            .exec((err, organizationdata) => {
                if(!organizationdata){
                    res
                    .status(404)
                    .json({"message" : "food data not found"});
                    return; 
                } else if(err){
                    res
                    .status(404)
                    .json(err);
                    return;
                }
                res
                .status(200)
                .json(organizationdata)
            });
        } else{
            res
            .status(404)
            .json({"message":"No location in Request"});
        }

};

const updateOrganization = async function(req, res){
    if(!req.params.organizationid){
        res
        .status(404)
        .json({"message" : "Not Found, Foodid required"});
        return;
    }
    await Organization.findById(req.params.organizationid)
        .exec((err, organizationdata) =>{
            if(!organizationdata){
                res
                .status(404)
                .json({"message" : "recipeid not found"});
                return;
            } else if(err){
                res
                .status(404)
                .json(err);
                return;
            }
            organizationdata.organizationName = req.body.organizationName,
            organizationdata.organizationType = req.body.organizationType,
            organizationdata.username = req.body.username,
            organizationdata.password = req.body.password,
            organizationdata.save((err, organizationdata) =>{
                if(err){
                    res
                    .status(404)
                    .json(err);
                } else {
                    res
                    .status(200)
                    .json(organizationdata);
                }
            });
        });
};


const deleteOrganization = async function(req, res){
   const organizationid = req.params.organizationid;
   if(organizationid){
    await Organization
       .findByIdAndRemove(organizationid)
       .exec((err, organizationdata) => {
           if(err){
               res
               .status(404)
               .json(err);
            return;
           }
           res
           .status(204)
           .json({"message" : "Deleted Successfully"});
       });
   } else{
       res
       .status(404)
       .json({"message" : "No recipeid"});
   }
};

module.exports ={
    getOrganization, 
    createOrganization,
    getSingleOrganization,
    updateOrganization,
    deleteOrganization
};