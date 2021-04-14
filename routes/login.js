var express = require('express');
var router = express.Router();

const loginCtrl = require('../controller/login');

router.post('/', loginCtrl.login);

module.exports = router;