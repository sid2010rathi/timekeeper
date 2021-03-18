const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utility/utility');

const createEmployee = async function(req, res){
    //validate all request field, Username and Password made not required in model. So should be managed here
    await User.create({
        firstName: req.body.userFirstName,
        lastName: req.body.userLastName,
        username: req.body.userUsername,
        password: req.body.userPassword,
        role: req.body.userRole,
        organizationId: req.body.userOrganizationId        
    }, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.status(200).json(data);
    });
};

const updateEmployee = async(req, res) => {
    const user = req.user;
    if(user) {
        const {id} =  user;
        await User.findOneAndUpdate({_id: id}, {$set:{firstName:req.body.firstName,
        lastName: req.body.lastName, username: req.body.username, password: req.body.password,
        role: req.body.role, organizationId: req.body.organizationId}}, {new: true}, (err, doc) => {
            if(err) {
                res.status(400).json(err);
            }

            if(doc) {
                res.status(200).json({status: "ok", message:"Data found", data: doc});
            } else {
                res.status(404).json({status: "ok", message:"Data not found"});
            }
        });
    } else {
        return res.json({status: 'error', data: "User not found"});
    }
}

const getEmployee = async (req, res) => {
    const user = req.user;
    const {id, username} =  user;
    await User.findOne({ _id: id, username }).exec(async (err, data) => {
        if(err){
            res.status(400).json(err);
        }
        if(!data) {
            res.status(404).json({status: "ok", message:"Data not found"});
        } else {
            res.status(200).json({status: "ok", message:"Data found", data});
        }
    })
}

module.exports ={
    createEmployee,
    updateEmployee,
    getEmployee
};