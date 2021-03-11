const User = require('../model/user');

const createUser = async function(req, res){
    //validate all request field, Username and Password made not required in model. So should be managed here
    await User.create({
        firstName:req.body.userFirstName,
        lastName:req.body.userLastName,
        username: req.body.userUsername,
        password: req.body.userPassword,
        role: req.body.userRole,
        organizationId: req.body.userOrganizationId
        
    }, async (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.status(200).json(data);
    });
};

// const getSingleUser = async function(req, res){
//     if(req.params && req.params.userid){
//         await User
//             .findById(req.params.userid)
//             .exec((err, userdata) => {
//                 if(!userdata){
//                     res.status(404).json({"message" : "Data not found"});
//                     return; 
//                 } else if(err){
//                     res.status(404).json(err);
//                     return;
//                 }
//                 res.status(200).json(userdata)
//             });
//         } else{
//             res.status(404).json({"message":"ID not found"});
//         }

// };

// const updateOrganization = async function(req, res){
//     const _id = req.params.organizationid;
//     if(!_id){
//         res.status(404).json({"message" : "ID Not Found"});
//         return;
//     }
//     await Organization.findOne({_id})
//         .exec(async (err, data) =>{
//             if(!data){
//                 res.status(404).json({"message" : "Organization not found"});
//                 return;
//             } else if(err){
//                 res.status(404).json(err);
//                 return;
//             }
//             data.organizationName = req.body.organizationName,
//             data.organizationType = req.body.organizationType,
//             data.organizationSize = req.body.organizationSize,
//             data.organizationWebsite = req.body.organizationWebsite,
//             data.organizationStreet = req.body.organizationStreet,
//             data.organizationCity = req.body.organizationCity,
//             data.organizationZipcode = req.body.organizationZipcode,
//             data.organizationProvince = req.body.organizationProvince,
//             data.organizationCountry = req.body.organizationCountry,
//             await data.save((err, data) => {
//                 if(err){
//                     res.status(404).json(err);
//                 } else {
//                     res.status(200).json(data);
//                 }
//             });
//         });
// };


// const deleteOrganization = async function(req, res){
//     //when you delete organization delete its all belongings
//     const _id = req.params.organizationid;
//     if(_id){
//         await Organization.findByIdAndRemove({_id})
//         .exec((err, data) => {
//             if(err){
//                 res.status(404).json(err);
//                 return;
//             }
//             res.status(204).json({"message" : "Deleted Successfully"});
//         });
//    } else{
//        res.status(404).json({"message" : "No Organization Found"});
//    }
// };

module.exports ={
    //getUser, 
    createUser
    //getSingleUser,
    //updateUser,
    //deleteUser
};