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
            return res.status(200).json({status: "ok", data});
    })
}

const getLeaves = async (req, res) => {
    const { id } = req.user;

    await Leave.find({ userid: id }, (err, data) => {
        if(err)
            return res.status(400).json({status: "error", err});
        else
            return res.status(200).json({status: "ok", data});
    })
}

module.exports = {
    applyLeave,
    getLeaves
}