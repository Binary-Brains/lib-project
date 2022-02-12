const { check } = require("express-validator");

exports.addAccountValidator = [
  check("admin_name")
    .not()
    .isEmpty()
    .withMessage("admin_name is required")
    .isString()
    .withMessage("only string is allowed as name"),
  check("admin_contact")
    .not()
    .isEmpty()
    .withMessage("admin_contact is required")
    .isNumeric()
    .withMessage("only Numbers are allowed as Contact")
    .isLength({ min: 10, max:10 })
    .withMessage("Invalid contact number"),
  check("admin_city")
    .not()
    .isEmpty()
    .withMessage("admin_city is required")
    .isString()
    .withMessage("only string is allowed as city"),
  check("admin_state")
    .not()
    .isEmpty()
    .withMessage("admin_state is required")
    .isString()
    .withMessage("only string is allowed as State"),
  check("admin_dob")
    .not()
    .isEmpty()
    .withMessage("admin_dob is required")
    .isDate()
    .withMessage("only Date is allowed as DOB"),
  check("admin_email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not valid"),
  check("admin_password")
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
  check("admin_email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not valid"),
  check("admin_password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("only string is allowed as password")
    .isLength({ min: 8 })
    .withMessage("Password is minimum 8 Characters long"),
  //validation for the all the field should be strong
];
