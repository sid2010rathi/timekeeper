const cors = require('cors');
var createError = require('http-errors');
const bodyParser = require('body-parser')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const PORT = process.env.PORT || 5000;

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

//Path of react build
//app.use(express.static(path.join(__dirname,'', '')));

//add routes here

app.get("/", sayhi);

function sayhi(req, res) {
    res.send("Success!! Server is running.");
    //SRN@1234:finalprojectmean@gmail.com
}

app.listen(PORT, () => {
    console.log("Server is running on port : ", PORT);
})