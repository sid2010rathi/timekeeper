var express = require('express');
var router = express.Router();
const loginCtrl = require('../controller/login');
const leaveCtrl = require('../controller/leaves');

router.post('/', loginCtrl.loginRequired, leaveCtrl.applyLeave);
router.get('/', loginCtrl.loginRequired, leaveCtrl.getLeaves);
router.get('/all', loginCtrl.loginRequired, leaveCtrl.getOrganizationLeaves);
router.put('/', loginCtrl.loginRequired, leaveCtrl.updateLeave);

module.exports = router;