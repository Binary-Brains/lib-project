const { sendSuccess, sendError } = require("../utility/helper");
const gravatar = require("gravatar");
const { send } = require("../utility/sendMail");
const mongoose = require("mongoose");
const constants = require("../utility/errorConstants");

require("../models/Student");
require("../models/Library");
require("../models/Book");
require("../models/History");

var Student = mongoose.model("Student");
var Library = mongoose.model("Library");
var Book = mongoose.model("Book");
var History = mongoose.model("History");

var AuthModule = require("../utility/auth/auth_token");
const { compareSync } = require("bcrypt");

exports.createAccount = (req, res) => {
  var {
    student_name,
    student_email,
    student_password,
    student_city,
    student_state,
    student_dob,
    student_contact,
  } = req.body;
  try {
    Student.findOne({ student_email }, function (err, account) {
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
      var avatar = "https:" + gravatar.url(student_email);
      var login_type = "email";

      var student = new Student({
        student_city,
        student_contact,
        student_dob,
        student_email,
        student_name,
        student_password,
        student_state,
        avatar,
        login_type,
      });
      student.save(function (err, stuSave) {
        if (err) {
          return sendError(res, err, err.message, constants.SERVER_ERROR);
        }

        //after the student is saved in the database send a mail to the user to
        //verify the account handle that link directly using backend and redirect to the frontend
        var { _id, student_email, student_name } = stuSave;

        generateVerifyEmail(
          _id,
          student_email,
          student_name,
          function (err, emailSent) {
            if (err) {
              return sendError(
                res,
                err,
                "email_not_sent",
                constants.SERVER_ERROR
              );
            }
            return sendSuccess(res, stuSave);
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
  var student_id = req.params.id;
  if (!student_id) {
    return sendError(res, "Invalid Student ID", "invalid_student_id", 404);
  }
  try {
    Student.findByIdAndUpdate(
      student_id,
      { $set: { is_verified: true, vrfy_at: Date.now() } },
      (err, student) => {
        if (err) return sendError(res, err, err.message, 500);
        else {
          if (!student)
            return sendError(
              res,
              "No Student Against the id",
              "No user found",
              404
            );
          else {
            Student.findById(student._id, (err, updatedStuData) => {
              if (err) return sendError(res, err, err.message, 500);
              return sendSuccess(res, updatedStuData);
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
  var { student_email, student_password } = req.body;

  Student.findOne(
    { student_email},
    function (err, student) {
      if (err) {
        return sendError(res, err, "server_error", constants.SERVER_ERROR);
      }
      if (!student) {
        return sendError(
          res,
          "Account doesn't exits",
          "account_doesnot_exist",
          constants.BAD_REQUEST
        );
      }else if(!student.is_verified) {
        return sendError(res, "Not Verified Account", "You need to Verify the account! Check Your Mail..", constants.BAD_REQUEST)
      }
      else if (student.login_type != "email") {
        return sendError(
          res,
          "Account Already exist using Third party",
          "account_mode_differ",
          constants.BAD_REQUEST
        );
      } else {
        var data = {};
        //compare the given password with the saved hash
        student.comparePassword(
          student_password,
          function (err, match_password) {
            if (err) {
              return sendError(
                res,
                err,
                "server_error",
                constants.SERVER_ERROR
              );
            }
            var student_id = student["_id"];
            if (student.status === "block") {
              return sendError(
                res,
                "Your ID is been Blocked By Administrator",
                "Your ID is been Blocked By Administrator",
                402
              );
            }
            if (match_password) {
              //to generate the token the following function is being used
              var token = AuthModule.getAT({ id: student_id });
              data["token"] = token;
              data["profile_data"] = student;
              return sendSuccess(res, data);
            } else {
              return sendError(
                res,
                "Invalid Credentials",
                "invalid_creds",
                constants.BAD_REQUEST
              );
            }
          }
        );
      }
    }
  );
};

exports.googleSignupController = (req, res, accessToken, userProfile) => {
  if (!userProfile)
    return sendError(res, "Profile Not found", "not_found", 400);
  else {
    var { sub, name, email, picture } = userProfile._json;
    Student.findOne({ student_email: email }, (err, student) => {
      if (err) {
        return sendError(res, err, "server_error", constants.SERVER_ERROR);
      }
      if (student) {
        //check weather the user has registered using google signup only or not if yes then return the token and the profile detaill
        googleSigninController(req, res, accessToken, userProfile);
      } else {
        var student = new Student({
          student_name: name,
          student_email: email,
          student_password: sub,
          student_dob: 2000 - 01 - 01,
          avatar: picture,
          student_contact: 1111111111,
          student_state: "Delhi",
          student_city: "New Delhi",
          is_verified: true,
          vrfy_at: Date.now(),
          login_type: "google",
        });
        student.save((err, student_save) => {
          if (err) return sendError(res, err, err.message, 500);
          return sendSuccess(res, student_save);
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
    Student.findOne({ student_email: email }, (err, student) => {
      if (err) {
        return sendError(res, err, "server_error", constants.SERVER_ERROR);
      }
      if (!student) {
        return sendError(res, err, "account_doesn't_exist", 200);
      } else if (student.login_type != "google") {
        return sendError(res, err, "different login request", 402);
      } else {
        var data = {};
        //compare the given password with the saved hash
        student.comparePassword(sub, function (err, match_password) {
          if (err) {
            return sendError(res, err, "server_error", constants.SERVER_ERROR);
          }
          var student_id = student["_id"];
          if (student.status === "block") {
            return sendError(
              res,
              "Your ID is been Blocked By Administrator",
              "Your ID is been Blocked By Administrator",
              402
            );
          }
          if (match_password) {
            //to generate the token the following function is being used
            var token = AuthModule.getAT({ id: student_id });
            data["token"] = token;
            data["profile_data"] = student;
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

exports.requestController = (req, res) => {
  var library_id = req.params.lib_id;
  var student_id = req.body.student_id;
  var library_request = { library_id: library_id, requested_at: Date.now() };
  var pending_request = { student_id: student_id, requested_at: Date.now() };

  Student.findById({ _id: student_id }, function (err, account) {
    if (err) {
      return sendError(res, err, "server_error", constants.SERVER_ERROR);
    }
    var studentRequests = account.library_request;
    var studentLibraries = account.librarires;
    var alreadyRequested = studentRequests ? studentRequests.some( reqsts => reqsts.library_id.toString() === library_id ) : false;
    var alreadyMember = studentLibraries ? studentLibraries.some( librarires => librarires.library_id.toString() === library_id ) : false;
    if(alreadyRequested || alreadyMember) {
      if (alreadyRequested) return sendError(res, err, "Already requested to this library", constants.BAD_REQUEST);
      if (alreadyMember) return sendError(res, err, "Already member of this library", constants.BAD_REQUEST);
    } else {
      Student.updateOne(
        { _id: student_id }, 
        { $push: { library_request: library_request }}, 
        function (err, account) {
        if (err) {
          return sendError(res, err, "server_error", constants.SERVER_ERROR);
        }
        Library.findByIdAndUpdate(
          { _id: library_id },
          { $push: { pending_request: pending_request }},
          function (err, library) {
            if (err) {
              return sendError(res, err, "server_error", constants.SERVER_ERROR);
            }
            Student.findById({ _id: student_id }, (err, updatedStuData) => {
              if (err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
              return sendSuccess(res, updatedStuData);
            });
          }
        )
        })
      }
  });
}

exports.reserveBook = (req, res) => {
  var book_name = req.body.book_name;
  var student_id = req.user.id;
  var query = { book_name: book_name, book_status: 1 };
  Book.findOne(query, function(err, book) {
    if(err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
    if(book) {
        Book.updateOne({ _id: book._id }, { book_status: 3 }, function(err, book1) {
          if(err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
          var bookHistory = new History({
            book_id: book._id, 
            student_id: student_id, 
            booked_at: Date.now()
          });
          bookHistory.save(function(err, result) {
            if(err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
            return sendSuccess(res, result);
          });
        });
    } else {
      return sendError(res, err, "Requested book is not available", constants.SERVER_ERROR);
    }
  });
}

exports.studentData = (req, res) => {
  var studentProfile = req.profile;
  return sendSuccess(res, studentProfile);
}

const generateVerifyEmail = async (id, email, name, cb) => {
  //we get the id of that user just create url /api/verify/:id and send it to the mail
  var url = `http://localhost:3000/api/verify/${id}`;
  //setting the subject for the mail
  var subject = "Verify Account";
  //preparing the template for the mail
  var html = `
        <html>
        <body>
            <h3>Hi ${name},</h3><br><br>
            <h3>Welcome to the Library Management System as a Student</h3><br>
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
