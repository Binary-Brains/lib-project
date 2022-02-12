const { check } = require("express-validator");

exports.addAccountValidator = [
  check("student_name")
    .not()
    .isEmpty()
    .withMessage("student_name is required")
    .isString()
    .withMessage("only string is allowed as name"),
  check("student_contact")
    .not()
    .isEmpty()
    .withMessage("student_contact is required")
    .isNumeric()
    .withMessage("only Numbers are allowed as Contact")
    .isLength({ min: 10, max:10 })
    .withMessage("Invalid contact number"),
  check("student_city")
    .not()
    .isEmpty()
    .withMessage("student_city is required")
    .isString()
    .withMessage("only string is allowed as city"),
  check("student_state")
    .not()
    .isEmpty()
    .withMessage("student_state is required")
    .isString()
    .withMessage("only string is allowed as State"),
  check("student_dob")
    .not()
    .isEmpty()
    .withMessage("student_dob is required")
    .isDate()
    .withMessage("only Date is allowed as DOB"),
  check("student_email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not valid"),
  check("student_password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("only string is allowed as password")
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage("Use Strong Password"),
  //validation for the all the field should be strong
];

exports.loginAccountValidator = [
  check("student_email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not valid"),
  check("student_password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("only string is allowed as password")
    .isLength({ min: 8 })
    .withMessage("Password is minimum 8 Characters long"),
  //validation for the all the field should be strong
];
