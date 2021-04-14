var express = require('express');
var router = express.Router();

const loginCtrl = require('../controller/login');
const methodNotAllowed = (req, res, next) => res.status(405).send();
router
.route('/')
.post(loginCtrl.login)
.all(methodNotAllowed);
//router.post('/', loginCtrl.login);

module.exports = router;