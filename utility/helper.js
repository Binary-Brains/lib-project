var errorCodes = require("./errors");
var constants = require("./errorConstants");

module.exports = {
  sendError: function (res, err, error_index, status_code) {
    //we can take the err object and trace the error in the console
    console.trace(err);

    res
      .status(errorCodes[error_index] ? errorCodes[error_index][0] : 500)
      .json({
        code: errorCodes[error_index] ? errorCodes[error_index][0] : 404,
        message: errorCodes[error_index]
          ? errorCodes[error_index][1]
          : error_index,
        success: false,
        time: Date.now(),
      });
    return;
  },
  sendSuccess: function (res, data) {
    res.status(constants.OK).json({
      success: true,
      data: data,
      time: Date.now(),
    });
  },
};
