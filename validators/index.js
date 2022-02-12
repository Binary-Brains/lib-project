const { validationResult } = require("express-validator");
var constants = require("../utility/errorConstants");
var { sendError } = require("../utility/helper");

exports.runValidation = (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log("validation running");
    if (!errors.isEmpty()) {
      return sendError(
        res,
        errors,
        errors && errors.array() && errors.array()[0].msg,
        constants.BAD_REQUEST
      );
    }
    next();
  } catch (error) {
    return sendError(res, error, error.message, constants.BAD_REQUEST);
  }
};
