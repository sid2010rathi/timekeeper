const bcrypt = require('bcryptjs');
const User = require('../model/user');
const Usercodes = require('../model/usercodes');
const { MAIL_SENDER, randomNumber } = require('../utility/utility');
const { sendMail } = require('../services/sendmail');

const getCode = async function(req, res){
    const username = req.params.username;
    const code = randomNumber();
    const subject = "TimeKeeper: Code for Forget Password";
    const text = `This is your security code: ${code}.`;
    await Usercodes.findOne({ username, type:"Password" }).exec(async (err, data) => {
        if(err){
            return res.status(400).json(err);
        }
        if(!data) {
            await Usercodes.create({
                username: username,
                code: code,
                type: 'Password'
            }, (err) => {
                if(err) {
                    return res.status(400).json(err);
                }
            })
        } else {
            data.code = code
            data.save((err, data) => {
                if(err){
                    return res.status(404).json(err);
                }
            });
        }
        sendMail(MAIL_SENDER, username, subject, text);
        return res.status(200).json({status: 'ok', data});
    })    
};

const changePassword = async(req, res) => {
    const { username, password } = req.body;
    const encPassword = await bcrypt.hash(password, 5); 
    await User.findOneAndUpdate({username}, {$set:{password: encPassword}}, {new: true}, (err, doc) => {
        if(err) {
            return res.status(400).json(err);
        }
        if(doc) {
            return res.status(200).json({status: "ok", message:"Data found", data: doc});
        } else {
            return res.status(404).json({status: "ok", message:"Data not found"});
        }
    });
}

module.exports ={
    getCode,
    changePassword
};