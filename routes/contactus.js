
var express = require('express');
var router = express.Router();
const loginCtrl = require('../controller/login');
const contactusCtrl = require('../controller/contactus');

router.post('/', loginCtrl.loginRequired, contactusCtrl.createContact);

module.exports = router;