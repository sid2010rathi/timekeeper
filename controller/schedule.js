const { sendMail } = require('../services/sendmail');
const { MAIL_SENDER } = require('../utility/utility');
const Scheduler = require('../model/scheduler');

const createSchedule = async (req, res) => {
    const {assignee, assigner, schedule} = req.body;
    await Scheduler.create({
        assignee: assignee,
        assigner: assigner,
        schedule: schedule
    }, (err, data) => {
        if(err) {
            res.status(400).json(err);
            throw err;
        } else {
            res.status(200).json({status: 'ok', data});
        }
    });
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