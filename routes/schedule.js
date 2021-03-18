var express = require('express');
var router = express.Router();

const scheduleCtrl = require('../controller/schedule');
const loginCtrl = require('../controller/login');

router.post('/', loginCtrl.loginRequired, scheduleCtrl.createSchedule);
router.get('/:assignee/:assigner', loginCtrl.loginRequired, scheduleCtrl.getSchedule);
router.put('/:assignee/:assigner', loginCtrl.loginRequired, scheduleCtrl.updateSchedule);

module.exports = router;