const bcrypt = require('bcryptjs');
const Organization = require('../model/organization');

const login = async function(req, res){
    const {username,password} = req.body;
    const user = await Organization.findOne({username}).lean();
    if(!user) {
        return res.status(404).json({status: 'error', error:"Invalid username/password"});    
    }

    if(await bcrypt.compare(password, user.password))
        return res.status(200).json({status: 'ok', data:"User Logged in"});
    else
        return res.status(200).json({status: 'error', error:"Invalid username/password"});
    
};

module.exports ={
    login
};


