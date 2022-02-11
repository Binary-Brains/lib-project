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
};

module.exports = errors;
