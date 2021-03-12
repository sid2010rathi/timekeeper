var express = require('express');
var router = express.Router();

const attendenceCtrl = require('../controller/attendence');

router.post('/in', attendenceCtrl.punchIn);
router.put('/out/:userid/:organizationid', attendenceCtrl.punchOut);

module.exports = router;