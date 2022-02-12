var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var config = require("../../config/config");
var constants = require("../errorConstants");
var helper = require("../../utility/helper");
var sendError = helper.sendError;


require("../../models/Admin")
require("../../models/Student")

const Admin = mongoose.model("Admin")
const Student = mongoose.model("Student")

exports.getAT = function (object_for_payload) {
  object_for_payload.hascode = randomNumberOfLength(
    config.RANDOM_NUMBER_LENGTH
  );
  return jwt.sign(object_for_payload, config.JWT_SECRET, {
    expiresIn: config.TOKEN_EXPRIES_TIME,
  });
};

function randomNumberOfLength(length) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
}


exports.authStudent = function (req, res, next) {
  // get the token from the header
  const token = req.header("x-auth-token");

  if (!token) {
    return sendError(
      res,
      "Access without token is not authorised",
      "invalid_tokn",
      constants.BAD_REQUEST
    );
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    Student.findById(req.user.id, function (err, profile) {
      if (!profile) {
        return sendError(
          res,
          "no_profile_against_token",
          "There is no Profile against the token",
          404
        );
      }
      if (profile.status === "block") {
        return sendError(
          res,
          "Your ID is been Blocked By Administrator",
          "Your ID is been Blocked By Administrator",
          402
        );
      }
      req.profile = profile;
      next();
    });
  } catch (err) {
    return sendError(
      res,
      err,
      "token_auth_failure",
      constants.TOKEN_EXPIRED
    );
  }
};


exports.authAdmin = function (req, res, next) {
  // get the token from the header
  const token = req.header("x-auth-token");

  if (!token) {
    return sendError(
      res,
      "Access without token is not authorised",
      "invalid_tokn",
      constants.BAD_REQUEST
    );
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    Admin.findById(req.user.id, function (err, profile) {
      if (!profile) {
        return sendError(
          res,
          "no_profile_against_token",
          "There is no Profile against the token",
          404
        );
      }
      if (profile.status === "block") {
        return sendError(
          res,
          "Your ID is been Blocked By Administrator",
          "Your ID is been Blocked By Administrator",
          402
        );
      }
      req.profile = profile;
      next();
    });
  } catch (err) {
    return sendError(
      res,
      err,
      "token_auth_failure",
      constants.TOKEN_EXPIRED
    );
  }
};

