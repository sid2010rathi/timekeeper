var express = require('express');
var router = express.Router();
const cors = require('cors');

const donationCtrl = require('../controller/paypal-donation');
const { route } = require('./organization');


router.post('/', cors(), donationCtrl.donation);
router.get('/success', donationCtrl.donationSuccess);
router.get('/cancel', donationCtrl.donationSuccess);

module.exports = router;