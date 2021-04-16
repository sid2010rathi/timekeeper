const { sendMail } = require('../services/sendmail');
const { MAIL_SENDER } = require('../utility/utility');
const Scheduler = require('../model/scheduler');
const User = require('../model/user');

const dayObject = (date, starttime, endtime) => {
    return {date, starttime, endtime}
}

const createSchedule = async (req, res) => {
    const user = req.user;
    const id = user.id;
    const {id:assignee, startdate:weeknumber, day: day, date: date, start: starttime, end:endtime} = req.body;

    let weeks = []
    let schedule = {}

    switch(day) {
        case "monday":
            let monday = dayObject(date,starttime,endtime)
            schedule = {
                weeknumber,
                monday
            }
            break;
        case "tuesday":
            let tuesday = dayObject(date,starttime,endtime)
            schedule = {
                weeknumber,
                tuesday
            }
            break;
        case "wednesday":
            let wednesday = dayObject(date,starttime,endtime)
            schedule = {
                weeknumber,
                wednesday
            }
            break;
        case "thursday":
            let thursday = dayObject(date,starttime,endtime)
            schedule = {
                weeknumber,
                thursday
            }
            break;
        case "friday":
            let friday = dayObject(date,starttime,endtime)
            schedule = {
                weeknumber,
                friday
            }
            break;
        case "saturday":
            let  saturday = dayObject(date,starttime,endtime)
            schedule = {
                weeknumber,
                saturday
            }
            break;
        case "sunday":
            let  sunday = dayObject(date,starttime,endtime)
            schedule = {
                weeknumber,
                sunday
            }
            break;
    }
    weeks.push(schedule)
    await Scheduler.findOne({assignee}, async (err, data) => {
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
            await Scheduler.create({
                assigner: id,
                assignee,
                weeks
            }, (err, data) => {
                if(err)
                    return res.status(400).json({status:"error", err});
                if(data)
                    return res.status(200).json({status:"ok", data});
            })
        }
    })
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