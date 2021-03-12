const { sendMail } = require('../services/sendmail');
const { MAIL_SENDER } = require('../utility/utility');
const Attendence = require('../model/attendence');

const punchIn = async (req, res) => {
    console.log("Punch In API Called")
    const {userid, organizationid} = req.body;
    const punch = {
        date: Date.now(),
        inTime: Date.now()
    }
    await Attendence.findOne({userid, organizationid}).exec(async (err, data) => {
        if(err) {
            res.status(400).json(err);
            throw err;
        }

        if(data) {
            data.punch.push(punch)
            await data.save((err, data) => {
                if(err){
                    res.status(404).json(err);
                } else {
                    res.status(200).json({status: 'ok', data});
                }
            });
        } else {
            await Attendence.create({
                userid: userid,
                organizationid: organizationid,
                punch: [punch]
            }, (err, data) => {
                if(err) {
                    res.status(400).json(err);
                    throw err;
                } else {
                    res.status(200).json({status: 'ok', data});
                }
            });
        }
    })
}

const punchOut = async(req, res) => {
    console.log("Punch Out API Called", req.body)
    const {date} = req.body;
    const {userid, organizationid} = req.params;

    await Attendence.findOne({userid, organizationid})
    .exec(async (err, data) => {
        if(err) {
            res.status(400).json(err);
            throw err;
        } else {
            const punch = data.punch;
            data.punch[0].outTime = Date.now()
            await data.save((err, data) => {
                if(err){
                    res.status(404).json(err);
                } else {
                    res.status(200).json({status: 'ok', data});
                }
            });
        }
    })
}

module.exports = {
    punchIn,
    punchOut
}