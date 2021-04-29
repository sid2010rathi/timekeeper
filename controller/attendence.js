const { sendMail } = require('../services/sendmail');
const { calculateHours } = require('../utility/utility');
const Attendence = require('../model/attendence');
var dateFormat = require("dateformat");

const punchIn = async (req, res) => {
    console.log("Punch In API Called")
    const {userid, organizationid} = req.body;
    let now = new Date();
    const punch = {
        date: dateFormat(now, "longDate"),
        inTime: dateFormat(),
        week: dateFormat(now, "W")
    }
    await Attendence.findOne({userid, organizationid}).exec(async (err, data) => {
        if(err) {
            res.status(400).json(err);
            throw err;
        }
        if(data) {
            const punchArray = data.punch
            let date = dateFormat(now, "longDate");
            for(let punchData of punchArray) {
                if(punchData.date !== date) {
                    data.punch.push(punch)
                }
            }
            
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
    console.log("Punch Out API Called")
    const {userid, organizationid} = req.body;
    let now = new Date();

    await Attendence.findOne({userid, organizationid})
    .exec(async (err, data) => {
        if(err) {
            res.status(400).json(err);
            throw err;
        } else {
            const punch = data.punch
            let date = dateFormat(now, "longDate");
            for(let punchData of punch) {
                if(punchData.date === date) {
                    punchData.outTime = dateFormat()
                    console.log(calculateHours(punchData.outTime, punchData.inTime))
                    punchData.workedHours = calculateHours(punchData.outTime, punchData.inTime);
                }
            }
            
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

const getAttandence = async (req, res) => {
    const userid = req.user.id;
    await Attendence.findOne({userid}).exec(async (err, data) => {
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

module.exports = {
    punchIn,
    punchOut,
    getAttandence
}