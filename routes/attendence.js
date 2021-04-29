var express = require('express');
var router = express.Router();

const attendenceCtrl = require('../controller/attendence');
const loginCtrl = require('../controller/login');

router.post('/in', loginCtrl.loginRequired, attendenceCtrl.punchIn);
router.put('/out', loginCtrl.loginRequired, attendenceCtrl.punchOut);
router.get('/attendencedetails',  attendenceCtrl.getAttandence);

module.exports = router;