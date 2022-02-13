const { sendSuccess, sendError } = require("../utility/helper");
const gravatar = require("gravatar");
const { send } = require("../utility/sendMail");
const mongoose = require("mongoose");
const constants = require("../utility/errorConstants");

require("../models/Admin");

var Admin = mongoose.model("Admin");

var AuthModule = require("../utility/auth/auth_token");

exports.createAccount = (req, res) => {
  var {
    admin_name,
    admin_email,
    admin_password,
    admin_city,
    admin_state,
    admin_dob,
    admin_contact,
  } = req.body;
  try {
    Admin.findOne({ admin_email }, function (err, account) {
      if (err) {
        return sendError(res, err, "server_error", constants.SERVER_ERROR);
      }
      if (account) {
        return sendError(
          res,
          "Account Already exist",
          "account_already_exist",
          constants.BAD_REQUEST
        );
      }
      var avatar = "https:" + gravatar.url(admin_email);
      var login_type = "email";

      var admin = new Admin({
        admin_city,
        admin_contact,
        admin_dob,
        admin_email,
        admin_name,
        admin_password,
        admin_state,
        avatar,
        login_type,
      });
      admin.save(function (err, admSave) {
        if (err) {
          return sendError(res, err, err.message, constants.SERVER_ERROR);
        }

        //after the admin is saved in the database send a mail to the user to
        //verify the account handle that link directly using backend and redirect to the frontend
        var { _id, admin_email, admin_name } = admSave;

        generateVerifyEmail(
          _id,
          admin_email,
          admin_name,
          function (err, emailSent) {
            if (err) {
              return sendError(
                res,
                err,
                "email_not_sent",
                constants.SERVER_ERROR
              );
            }
            return sendSuccess(res, admSave);
          }
        );
      });
    });
  } catch (error) {
    return sendError(res, error, error.message, 500);
  }
};

exports.verifyAccount = (req, res) => {
  //this controller will be used to verify the account
  var admin_id = req.params.id;
  if (!admin_id) {
    return sendError(res, "Invalid admin ID", "invalid_admin_id", 404);
  }
  try {
    Admin.findByIdAndUpdate(
      admin_id,
      { $set: { is_verified: true, vrfy_at: Date.now() } },
      (err, admin) => {
        if (err) return sendError(res, err, err.message, 500);
        else {
          if (!admin)
            return sendError(
              res,
              "No admin Against the id",
              "No user found",
              404
            );
          else {
            Admin.findById(admin._id, (err, updatedAdmData) => {
              if (err) return sendError(res, err, err.message, 500);
              return sendSuccess(res, updatedAdmData);
            });
          }
        }
      }
    );
  } catch (error) {
    return sendError(res, error, error.message, 500);
  }
};

exports.loginControlller = (req, res) => {
  var { admin_email, admin_password } = req.body;

  Admin.findOne({ admin_email, is_verified: true }, function (err, admin) {
    if (err) {
      return sendError(res, err, "server_error", constants.SERVER_ERROR);
    }
    if (!admin) {
      return sendError(
        res,
        "Account doesn't exits",
        "account_doesnot_exist",
        constants.BAD_REQUEST
      );
    } else if (admin.login_type != "email") {
      return sendError(
        res,
        "Account Already exist using Third party",
        "account_mode_differ",
        constants.BAD_REQUEST
      );
    } else {
      var data = {};
      //compare the given password with the saved hash
      admin.comparePassword(admin_password, function (err, match_password) {
        if (err) {
          return sendError(res, err, "server_error", constants.SERVER_ERROR);
        }
        var admin_id = admin["_id"];
        if (admin.status === "block") {
          return sendError(
            res,
            "Your ID is been Blocked By Administrator",
            "Your ID is been Blocked By Administrator",
            402
          );
        }
        if (match_password) {
          //to generate the token the following function is being used
          var token = AuthModule.getAT({ id: admin_id });
          data["token"] = token;
          data["profile_data"] = admin;
          return sendSuccess(res, data);
        } else {
          return sendError(
            res,
            "Invalid Credentials",
            "invalid_creds",
            constants.BAD_REQUEST
          );
        }
      });
    }
  });
};

exports.adminData = (req, res) => {
  var adminProfile = req.profile;
  return sendSuccess(res, adminProfile);
};

exports.googleSignupController = (req, res, accessToken, userProfile) => {
  if (!userProfile)
    return sendError(res, "Profile Not found", "not_found", 400);
  else {
    var { sub, name, email, picture } = userProfile._json;
    Admin.findOne({ admin_email: email }, (err, admin) => {
      if (err) {
        return sendError(res, err, "server_error", constants.SERVER_ERROR);
      }
      if (admin) {
        //check weather the user has registered using google signup only or not if yes then return the token and the profile detaill
        googleSigninController(req, res, accessToken, userProfile);
      } else {
        var admin = new Admin({
          admin_name: name,
          admin_email: email,
          admin_password: sub,
          admin_dob: 2000 - 01 - 01,
          avatar: picture,
          admin_contact: 1111111111,
          admin_state: "Delhi",
          admin_city: "New Delhi",
          is_verified: true,
          vrfy_at: Date.now(),
          login_type: "google",
        });
        admin.save((err, admin_save) => {
          if (err) return sendError(res, err, err.message, 500);
          return sendSuccess(res, admin_save);
        });
      }
    });
  }
};

const googleSigninController = (req, res, accessToken, userProfile) => {
  if (!userProfile)
    return sendError(res, "Profile Not found", "not_found", 400);
  else {
    var { sub, email } = userProfile._json;
    Admin.findOne({ admin_email: email }, (err, admin) => {
      if (err) {
        return sendError(res, err, "server_error", constants.SERVER_ERROR);
      }
      if (!admin) {
        return sendError(res, err, "account_doesn't_exist", 200);
      } else if (admin.login_type != "google") {
        return sendError(res, err, "different login request", 402);
      } else {
        var data = {};
        //compare the given password with the saved hash
        admin.comparePassword(sub, function (err, match_password) {
          if (err) {
            return sendError(res, err, "server_error", constants.SERVER_ERROR);
          }
          var admin_id = admin["_id"];
          if (admin.status === "block") {
            return sendError(
              res,
              "Your ID is been Blocked By Administrator",
              "Your ID is been Blocked By Administrator",
              402
            );
          }
          if (match_password) {
            //to generate the token the following function is being used
            var token = AuthModule.getAT({ id: admin_id });
            data["token"] = token;
            data["profile_data"] = admin;
            return sendSuccess(res, data);
          } else {
            return sendError(
              res,
              "Invalid Credentials",
              "invalid_creds",
              constants.BAD_REQUEST
            );
          }
        });
      }
    });
  }
};

exports.errorController = (req, res) => {
  return sendError(res, "Google Server Error", "Third party error", 500);
};

const generateVerifyEmail = async (id, email, name, cb) => {
  //we get the id of that user just create url /api/verify/:id and send it to the mail
  var url = `http://localhost:3000/api/verify/admin/${id}`;

  //if in the production the link should be for verify online
  if(process.env.NODE_ENV=="production") url=`http://l-backend.herokuapp.com/api/verify/admin/${id}`

  //setting the subject for the mail
  var subject = "Verify Account";
  //preparing the template for the mail
  var html = `
        <html>
        <body>
            <h3>Hi ${name},</h3><br>
            <h3>Welcome to the Library Management System as an Admin</h3><br>
            <h5>To Verify the account click on the link which is valid for next 24 hrs</h5><br>
            <a href=${url}>Click Here to verify</a>
        <body>
        </html>
    `;
  send(email, subject, html, (err, res) => {
    if (err) cb(err, null);
    else cb(null, res);
  });
};

//getAdmin profile
//edit admin, library, book, student. edit book stock
exports.editAdminController = (req, res) => {
  var admin_id = req.profile._id;
  var updateAdmin = req.body.admin_data;
  Admin.findByIdAndUpdate( { _id: admin_id }, updateAdmin, { new: true}, function(err, updatedAdmin) {
    if(err) return sendError(res, err, err.message, constants.BAD_REQUEST);
    return sendSuccess(res, updatedAdmin);
  });
}
