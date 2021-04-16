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
        day,
        starttime,
        endtime
    }
    entries.push(entry)

    let scheduler = new Scheduler({
        _id: new mongoose.Types.ObjectId(),
        assigner: id,
        assignee,
        weeknumber,
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
    /*await Scheduler.findOne({assignee}, async (err, data) => {
        if(err) {
            return  res.status(400).json({status:"error", err});
        } else if(data){
            data.weeks.push(schedule);
            await data.save(async (err, save) => {
                if(err) {
                    return res.status(400).json({status:"error", err});
                }
                if(data) {
                    return res.status(200).json({status:"ok", data});
                }
            });
        } else {
            let schedule = new Scheduler({
                _id: new mongoose.Types.ObjectId(),
                assigner: id,
                assignee,
                weeks
            })
            await User.findOneAndUpdate({_id: assignee}, {$set:{
                Schedule: schedule}}, {new: true}, (err, doc) => {
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
    })*/
}

const getSchedule = async (req, res) => {

    const {assignee, assigner} = req.params;

    await Scheduler.findOne({
        assignee: assignee,
        assigner: assigner
    }, (err, data) => {
        if(err) {
            res.status(400).json(err);
            throw err;
        } else {
            res.status(200).json({status: 'ok', data});
        }
    });
}

const updateSchedule = async (req, res) => {
    const {assignee, assigner, schedule} = req.body;
    const paramsAssignee = req.params.assignee;
    const paramsAssigner = req.params.assigner;

    await Scheduler.findOne({
        assignee: paramsAssignee,
        assigner: paramsAssigner
    }).exec(async(err, data) => {
        if(err) {
            res.status(400).json(err);
            throw err;
        }

        if(data) {
            data.assignee = assignee,
            data.assigner = assigner,
            data.schedule = schedule
            await data.save((err, data) => {
                if(err){
                    res.status(404).json(err);
                } else {
                    res.status(200).json({status: 'ok', data});
                }
            });
        } else {
            res.status(200).json({status: 'error', data: null});
        }
    })
}

module.exports= {
    createSchedule,
    getSchedule,
    updateSchedule
}