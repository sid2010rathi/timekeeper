const bcrypt = require('bcryptjs');
const User = require('../model/user');
const { MAIL_SENDER } = require('../utility/utility');
const { sendMail } = require('../services/sendmail');

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
        organizationId: req.body.organizationId
    }, (err, data) => {
        if(err)
            res.status(400).json(err);
        else {
            const subject = "TimeKeeper: Credentials for your login";
            const text = `Hi ${data.firstName},

            Username: ${data.username}
            Password: ${plainTextPassword}
            
            
            Thank you,
            Team Timekeeper`;
            sendMail(MAIL_SENDER, req.body.username, subject, text);
            res.status(200).json(data);
        }
    });
};

const updateEmployee = async(req, res) => {
    const user = req.user;
    if(user) {
        const {id} =  user;
        await User.findOneAndUpdate({_id: id}, {$set:{firstName:req.body.firstName,
        lastName: req.body.lastName, username: req.body.username,
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