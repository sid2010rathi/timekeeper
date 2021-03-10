const UserCode = require('../model/usercodes');

const verify = async(req, res) => {
    await UserCode
        .findOne({username: req.body.username, code: req.body.code})
        .exec((err, data) => {
            if(!data) {
               return res.status(200).json({status:"error", message:"Please Enter Valid Code"})
            } else {
                return res.status(200).json({status:"ok", message:"Account Varified"})
            }
        })
}

module.exports = {
    verify
}