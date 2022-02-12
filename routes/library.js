const express = require("express");
const { createLibraryController, addBookController, getLibrary, acceptRequestController, issueBook, returnBook, availableBooks, issuedBooks, libraryStudentHistory } = require("../controllers/library");
const { authAdmin, authStudent } = require("../utility/auth/auth_token");
const { sendError, sendSuccess } = require('../utility/helper');
const { runValidation } = require("../validators");
const { addLibraryValidator, addBookValidator, getLibraryValidator } = require("../validators/library");

const router = express.Router()

router.get('/', (req, res) => {
    return sendSuccess(res, {msg: "Welcome To the Library!"})
})

//create a library
router.post('/cr_lib', authAdmin, addLibraryValidator, runValidation, createLibraryController)
//get the library details (Like all the books available)
router.post('/get_lib', getLibraryValidator, runValidation, getLibrary)
//add list of books at once for library
router.post('/add_book', authAdmin, addBookController)
//edit the particular types of books details
//accept request of the student
router.post("/accept_rqst/:student_id", authAdmin, acceptRequestController);
//issue the book to the student
    //directly or the booked can be directly issued
router.post("/issue_book", authAdmin, issueBook);
//mark the book returned
router.post("/return_book", authAdmin, returnBook);
//view all the issued books of a particular lib (details with count)
router.get("/books_issued/:library_id", issuedBooks);
//view all the available books of a particular lib (details with count)
router.get("/books_available/:library_id", availableBooks);
//view all the reserved books of a particular lib (details with count)
//find student details using student id... send all history and student data..
//calculate book count by book name of a library...
router.post("/student_history", authAdmin, libraryStudentHistory);
//edit books
//stock update
//edit library..

//fine in phase 2

//edit books
//stock update
//edit library..

//fine in phase 2

module.exports = router