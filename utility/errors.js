var errorConst = require("./errorConstants");

var errors = {
  //short form of the error: [constant, message for the user]
  invalid_parameters: [errorConst.BAD_REQUEST, "Invalid Parameters"],
  server_error: [200, "Server Error"],
  account_already_exist: [300, "Accound Already Exist"],
  account_mode_differ: [
    300,
    "Account Already exist using Different Mode Of Signup, Please Choose the correct Way of Sign in!",
  ],
  already_subscribed: [350, "Already subscribe to this platform"],
  user_name_taken: [400, "User Name already taken please try another one"],
  password_length: [400, "password length should be greater than 8"],
  password_check: [
    500,
    "password must contain one capital letter,Special charactor and numerical value",
  ],
  email_not_sent: [500, "Email is not sent"],
  otp_invalid: [600, "Otp is invalid"],
  account_doesnot_exist: [700, "Account Doesnot exists"],
  email_invalid: [1400, "Email is invalid or disposal"],
  invalid_tokn: [800, "Access without token is not authorised"],
  invalid_creds: [900, "Invalid Credentials"],
  unauth_access: [402, "Unauthorize Access"],
  already_requested: [900, "Already requested to this library"],
  book_not_found: [950, "Requested book was not found"],
  book_unavailable: [951, "Requested book is not available"],
  issue_history: [952, "Issue history not found"],
  not_issued: [954, "Book not issued"],
  already_returned: [954, "Book already returned"],
};

module.exports = errors;
