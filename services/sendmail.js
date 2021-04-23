const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
      user: 'timekeeperproject4@gmail.com',
      pass: 'Test@123'
  }
});

const sendMail = async (from, to, subject, text) => {
  console.log("Call Send Mail API");
  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text
  };

  await transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendMail
}