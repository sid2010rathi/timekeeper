const mongoose = require('mongoose')
const { sendMail } = require('../services/sendmail');
const { MAIL_SENDER } = require('../utility/utility');
const Scheduler = require('../model/scheduler');
const User = require('../model/user');

// const dayObject = (date, starttime, endtime) => {
//     return {date, starttime, endtime}
// }

const createSchedule = async (req, res) => {
    const user = req.user;
    const id = user.id;
    const {id:assignee, startdate:weeknumber, day: day, date: date, start: starttime, end:endtime} = req.body;

    let entries = []
    let entry = {
        weeknumber,
        day,
        starttime,
        endtime
    }
    entries.push(entry)

    let scheduler = new Scheduler({
        _id: new mongoose.Types.ObjectId(),
        assigner: id,
        assignee,
        entries
    })
    console.log(scheduler)
    await User.findOne({_id: assignee}, (err, doc) => {
        if(err) {
            return res.status(400).json(err);
        }

        if(doc.schedule) {
            doc.schedule.entries.push(entry);
            doc.save((err, data) => {
                if(err) {
                    return res.status(400).json(err);
                } else {
                    return res.status(200).json({status: "ok", message:"Data found", data});
                }
            })
//            return res.status(200).json({status: "ok", message:"Data found", data: doc});
        } else {
            doc.schedule = scheduler;
            doc.save((err, data) => {
                if(err) {
                    return res.status(400).json(err);
                } else {
                    return res.status(200).json({status: "ok", message:"Data found", data});
                }
            })
        }
    });
}

const getSchedule = async (req, res) => {

    const {employeeID} = req.params;

    await User.findOne({
        employeeID: employeeID
    }, (err, data) => {
        if(err) {
            res.status(400).json(err);
            throw err;
        } else {
            res.status(200).json({status: 'ok', data: data.user.schedule});
        }
    });
}


module.exports= {
    createSchedule,
    getSchedule,
}