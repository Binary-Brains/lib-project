exports.send = (to, subject, html, cb) => {
  var nodemailer = require("nodemailer");

  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "libraryhacknitp@gmail.com",
      pass: "Library@123",
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
