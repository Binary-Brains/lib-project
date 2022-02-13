exports.send = (to, subject, html, cb) => {
  var nodemailer = require("nodemailer");

  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PWD
    },
  });

  var mailOptions = {
    to,
    subject,
    html,
  };
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      cb(error, null);
    } else {
      cb(null, response);
    }
  });
};
