var express = require('express');
var router = express.Router();

const organizationCtrl = require('../controller/organization');
const loginCtrl = require('../controller/login');

router.get('/', loginCtrl.loginRequired, organizationCtrl.getOrganization);
router.post('/', organizationCtrl.createOrganization);

router.get('/:organizationid', loginCtrl.loginRequired, organizationCtrl.getSingleOrganization);
router.put('/:organizationid', loginCtrl.loginRequired, organizationCtrl.updateOrganization);
router.delete('/:organizationid', loginCtrl.loginRequired, organizationCtrl.deleteOrganization);

module.exports = router;