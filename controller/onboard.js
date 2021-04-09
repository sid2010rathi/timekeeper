const bcrypt = require('bcryptjs');
const User = require('../model/user');
const Userdetails = require('../model/userdetails');
const mongoose = require('mongoose')

const createEmployee = async function(req, res){
    //validate all request field, Username and Password made not required in model. So should be managed here
    const { password: plainTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword, 5); //Password Encryption
    await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: password,
        role: req.body.role,
        organizationId: req.body.organizationId,
        phone: req.body.phone
    }, (err, data) => {
        if(err)
            return res.status(400).json({status: "error", err});
        else
            return res.status(200).json({status: "ok", data});
    });
};

const updateEmployee = async(req, res) => {
    const user = req.user;

    if(user) {
        const {id} =  user;
        const userdetails = new Userdetails({
            _id: new mongoose.Types.ObjectId(),
            phone: req.body.phone,
            street: req.body.street,
            city: req.body.city,
            zipcode: req.body.zipcode,
            province: req.body.province,
            country: req.body.country
        })
        await User.findOneAndUpdate({_id: id}, {$set:{
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            userdetails: userdetails}}, {new: true}, (err, doc) => {
            if(err) {
                return res.status(400).json(err);
            }

            if(doc) {
                return res.status(200).json({status: "ok", message:"Data found", data: doc});
            } else {
                return res.status(404).json({status: "ok", message:"Data not found"});
            }
        });
    } else {
        return res.json({status: 'error', data: "User not found"});
    }
}

const getEmployee = async (req, res) => {
    const user = req.user;
    const {id, username} =  user;
    await User.findOne({ _id: id }).exec(async (err, data) => {
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