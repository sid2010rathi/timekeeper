const Leave = require('../model/leaves')
const User = require('../model/user')

const applyLeave = async (req, res) => {
    const { fromDate, toDate, reason } = req.body;
    const { id, username } = req.user;
    const leave = new Leave({
        userid: id,
        username,
        fromDate,
        toDate,
        status: "APPLIED",
        reason
    })

    await Leave.create(leave, (err, data) => {
        if(err)
            return res.status(400).json({status: "error", err});
        else
            return res.status(200).json({status: "ok", message:"Data found", data});
    })
}

const getLeaves = async (req, res) => {
    const { id } = req.user;

    await Leave.find({ userid: id }, (err, data) => {
        if(err)
            return res.status(400).json({status: "error", err});
        else
            return res.status(200).json({status: "ok", message:"Data found", data});
    })
}

const getOrganizationLeaves = async (req, res) => {

    //logged in user
    const { id } = req.user;

    //find organization
    await User.findOne({_id:id}, async (err, data) => {
        if(err)
            return res.status(400).json({status: "error", err});
        else {
            let organizationId = data.organizationId;
            
            //find organization users
            await await User.find({organizationId}, async (err, data) => {
                let userIds = []
                if(data.length) {
                    for(let user of data) {
                        await userIds.push(user._id)
                    }

                    //find leaves of those users
                    await Leave.find({ userid: {$in: userIds} }, (err, data) => {
                        if(err)
                            return res.status(400).json({status: "error", err});
                        else
                            return res.status(200).json({status: "ok", message:"Data found", data});
                    })
                } else {
                    return res.status(404).json({status: "ok", message:"Data not found"});
                }
            })
        }
    })
}

const updateLeave = async (req, res) => {

    //logged in user
    const { id } = req.user;

    //leave id
    const { _id, status } = req.body;

    //find leave and update
    await Leave.findOneAndUpdate({_id}, {$set:{status}}, {new: true}, (err, data) => {
        if(err)
            return res.status(400).json({status: "error", err});
        else {
            return res.status(200).json({status: "ok", message:"Data found", data});
        }
    })

}

module.exports = {
    applyLeave,
    getLeaves,
    getOrganizationLeaves,
    updateLeave
}