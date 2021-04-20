const cors = require('cors');
const createError = require('http-errors');
const bodyParser = require('body-parser')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
require('./utility/db');
const { JWT_SECRET } = require('./utility/utility');

//Port will be considered by server
const PORT = process.env.PORT || 5000;

//Routes imort
const OrganizationRoute = require("./routes/organization");
const loginRoute = require("./routes/login");
const onboardRoute = require("./routes/onboard");
const verifyRoute = require("./routes/verifyaccount")
const scheduleRoute = require("./routes/schedule")
const attendenceRoute = require("./routes/attendence")
const passwordRoute = require("./routes/password")
const leaveRoute = require('./routes/leaves')
const contactusRoute = require('./routes/contactus')

var app = express();
app.use(cors());

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

/*app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

//Verify user is logged in or not
app.use(async(req, res, next) => {
    if(req && req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        await jwt.verify(token, JWT_SECRET, (err, decode) => {
            if(err) req.user = undefined;
            req.user = decode;
            next()
        })
    } else {
        req.user = undefined;
        next()
    }
})

//Path of react build
//app.use(express.static(path.join(__dirname,'', '')));

//add routes here
app.get("/", (req, res) => {
    res.send("Hi This is test API")
});
app.use("/login", loginRoute);
app.use("/organizations", OrganizationRoute);
app.use("/onboard", onboardRoute);
app.use("/organizations/verify", verifyRoute);
app.use("/schedule", scheduleRoute);
app.use("/attendence", attendenceRoute);
app.use("/password", passwordRoute);
app.use("/leave", leaveRoute);
app.use("/contactus", contactusRoute)
app.listen(PORT, () => {
    console.log("Server is running on port : ", PORT);
})