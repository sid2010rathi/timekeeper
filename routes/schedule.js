var express = require('express');
var router = express.Router();

const scheduleCtrl = require('../controller/schedule');

router.post('/', scheduleCtrl.createSchedule);
router.get('/:assignee/:assigner', scheduleCtrl.getSchedule);
router.put('/:assignee/:assigner', scheduleCtrl.updateSchedule);

module.exports = router;