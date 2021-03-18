var express = require('express');
var router = express.Router();

const attendenceCtrl = require('../controller/attendence');
const loginCtrl = require('../controller/login');

router.post('/in', loginCtrl.loginRequired, attendenceCtrl.punchIn);
router.put('/out/:userid/:organizationid', loginCtrl.loginRequired, attendenceCtrl.punchOut);

module.exports = router;