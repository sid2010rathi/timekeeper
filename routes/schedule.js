var express = require('express');
var router = express.Router();

const scheduleCtrl = require('../controller/schedule');
const loginCtrl = require('../controller/login');

router.post('/', loginCtrl.loginRequired, scheduleCtrl.createSchedule);
router.get('/:employeeID', loginCtrl.loginRequired, scheduleCtrl.getSchedule);

module.exports = router;