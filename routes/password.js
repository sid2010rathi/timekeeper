var express = require('express');
var router = express.Router();

const loginCtrl = require('../controller/login');
const passwordCtrl = require('../controller/password')

router.get('/:username', passwordCtrl.getCode);
router.post('/', passwordCtrl.changePassword)

module.exports = router;