var express = require('express');
var router = express.Router();

const ctrlLogin = require('../controller/login');

router.post('/', ctrlLogin.login);

module.exports ={
    router
};