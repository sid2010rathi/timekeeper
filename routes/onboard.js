var express = require('express');
var router = express.Router();

const onboardCtrl = require('../controller/onboard');
const loginCtrl = require('../controller/login');

router.get('/', loginCtrl.loginRequired, onboardCtrl.getEmployee);
router.post('/', loginCtrl.loginRequired, onboardCtrl.createEmployee);
router.put('/', loginCtrl.loginRequired, onboardCtrl.updateEmployee);

//Delete Employee
router.delete('/', loginCtrl.loginRequired, onboardCtrl.deleteEmployee);

// router.get('/:organizationid', loginCtrl.loginRequired, organizationCtrl.getSingleOrganization);
// router.put('/:organizationid', loginCtrl.loginRequired, organizationCtrl.updateOrganization);
// router.delete('/:organizationid', loginCtrl.loginRequired, organizationCtrl.deleteOrganization);

module.exports = router;