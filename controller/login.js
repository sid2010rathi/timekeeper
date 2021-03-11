const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utility/utility');
const User = require('../model/user');

function loginRequired(req, res, next) {
    if(req.user) {
        next();
    } else {
        res.status(401).json({message: "Unauthorized user"});
    }
}

const login = async function(req, res){
    const {username, password} = req.body;
    const user = await User.findOne({username}).lean();
    if(!user)
        return res.status(404).json({status: 'error', error:"Invalid username/password"}); 

    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, JWT_SECRET)
        user.password = undefined;
        return res.status(200).json({status: 'ok', token:token, user});
    }
    else
        return res.status(200).json({status: 'error', error:"Invalid username/password"});
    
};

module.exports ={
    login,
    loginRequired
};


