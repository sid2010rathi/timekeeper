var express = require('express');
var router = express.Router();

const ctrlOrganization = require('../controller/signup');

router.get('/', ctrlOrganization.getOrganization);
router.post('/', ctrlOrganization.createOrganization);

router.get('/:organizationid', ctrlOrganization.getSingleOrganization);
router.put('/:organizationid', ctrlOrganization.updateOrganization);
router.delete('/:organizationid', ctrlOrganization.deleteOrganization);

module.exports = router;