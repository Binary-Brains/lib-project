const { check } = require("express-validator");
const mongoose = require("mongoose")

require("../models/Library")

const Library = mongoose.model("Library")

exports.addLibraryValidator = [
  check("library_name")
    .not()
    .isEmpty()
    .withMessage("library_name is required")
    .isString()
    .withMessage("only string is allowed as name"),
  check("library_address")
    .not()
    .isEmpty()
    .withMessage("library_address is required")
    .isString()
    .withMessage("only String is allowed as Address"),
  check("library_contact")
    .not()
    .isEmpty()
    .withMessage("library_contact is required")
    .isString()
    .withMessage("only numbers is allowed as contact"),
  check("library_city")
    .not()
    .isEmpty()
    .withMessage("library_city is required")
    .isString()
    .withMessage("only string is allowed as city"),
  check("library_state")
    .not()
    .isEmpty()
    .withMessage("library_state is required")
    .isString()
    .withMessage("only string is allowed as State"),
  //validation for the all the field should be strong
];

exports.addBookValidator = [
  check("book_name")
    .not()
    .isEmpty()
    .withMessage("book_name is required")
    .isString()
    .withMessage("name is not valid"),
  check("book_pages")
    .not()
    .isEmpty()
    .withMessage("book_pages is required")
    .isNumeric()
    .withMessage("pages is not valid"),
  check("book_author")
    .not()
    .isEmpty()
    .withMessage("book_author is required")
    .isString()
    .withMessage("author is not valid"),
  check("book_publisher")
    .not()
    .isEmpty()
    .withMessage("book_publisher is required")
    .isString()
    .withMessage("publisher is not valid"),
  //validation for the all the field should be strong
];

exports.getLibraryValidator = [
    check("library_id")
    .not()
    .isEmpty()
    .withMessage("library_id is required")
    .custom((value) => {
      if (!value) return false;
      var regex = /^[0-9a-f]{24}$/;
      return regex.test(value);
    })
    .withMessage("Id is not valid mongo id")
  ];
  
