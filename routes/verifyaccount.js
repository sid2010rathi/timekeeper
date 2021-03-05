var express = require('express');
var router = express.Router();
const verifyService = require('../services/verifyaccount');

router.post('/', verifyService.verify);

module.exports = router;