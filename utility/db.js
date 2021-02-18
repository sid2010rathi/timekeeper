const mongoose = require('mongoose');

const dbURL = 'mongodb+srv://finalproject:euyf0iSdIh21Ojin@cluster0.p5uz2.mongodb.net/timekeeper?retryWrites=true&w=majority';
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on('connected', () => {
    console.log("Connected to the DB Sever");
});
mongoose.connection.on('error', err => {
    console.log("DB server Connection Error");
});
mongoose.connection.on('disconnected', () => {
    console.log("DB server Disconnected");
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log("Mongose disconnected");
        callback();
    });
};

require('../model/organization');
