const { sendError, sendSuccess } = require("../utility/helper");
const mongoose = require('mongoose');
const { addBookValidator } = require("../validators/library");
const { runValidation } = require("../validators");
const constants = require("../utility/errorConstants");

require("../models/Library")
require("../models/Admin")
require("../models/Student")
require("../models/Book")
require("../models/History")

const Library = mongoose.model("Library")
const Admin = mongoose.model("Admin")
const Student = mongoose.model("Student")
const Book = mongoose.model("Book")
const History = mongoose.model("History")


exports.createLibraryController = (req, res) => {
    var admin_id = req.user.id;
    var {library_name, library_address, library_city, library_state, library_contact } = req.body;
    try {
        //add a validation that if the admin has already a library can't create one
        Admin.findById(admin_id, (err, admin) => {
            if(err) return sendError(res, err, err.message, 500)
            if(admin.library_id) return sendError(res, "Library already created", "You have already added a library", 400)
            else{
                var library = new Library({
                    admin_id,
                    library_name,
                    library_address,
                    library_city,
                    library_state,
                    library_contact
                })
                library.save((err, lib) => {
                    if(err) return sendError(res, err, err.message, 500)
                    else{
                        Admin.findByIdAndUpdate(admin_id, {$set: {library_id: lib._id}},(err, admin) => {
                            if(err) return sendError(res, err, err.message, 500)
                            return sendSuccess(res, lib)
                        })
                    }
                })
            }
        })
    } catch (error) {
        return sendError(res, error, error.message, 500)
    }
}

exports.addBookController = async (req, res) => {
    //add books in bulk
    if(req.body.length < 1) return sendError(res, "Invalid Body", "Atleast one row should be filled", 400)
    else{
        var admin = await Admin.findById(req.user.id);
        var result = await createTheArray(req, res, admin);
        Book.insertMany(result, (err, books) => {
            if(err) return sendError(res, err, err.message, 500)
            return sendSuccess(res, books);
        })
    }
}

const createTheArray = async (req, res, admin) => {
    var result = []
    req.body.map((entry) => {
        result = result.concat(saveTheBook(entry, admin.library_id));
    })
    return result;
}

const saveTheBook = (data, library_id) => {
    var bookArray = [];
    //validation the input is pending
    for(var i=1; i<=data.book_stock; i++)
    {
        var book = {
            library_id,
            book_name: data.book_name,
            book_author: data.book_author,
            book_pages: data.book_pages,
            book_publisher: data.book_publisher
        }
        bookArray.push(book)
    }
    return bookArray;
}

exports.acceptRequestController = (req, res) => {
    var student_id = req.params.student_id;
    var library_id = req.body.library_id;
    var del_pending_request = { student_id: student_id };
    var del_library_request = { library_id: library_id };
    var add_library = { library_id: library_id, added_at: Date.now()  };
    var accepted_student = { student_id: student_id, added_at: Date.now() };

    Library.findByIdAndUpdate(
        { _id: library_id }, 
        { $pull: { pending_request: del_pending_request }, $push: { accepted_student: accepted_student } }, 
        function(err, library) {
            if(err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
            Student.findByIdAndUpdate(
                { _id: student_id },
                { $pull: { library_request: del_library_request }, $push: { librarires: add_library } },
                function(err, account) {
                    if(err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
                    Library.findById({ _id: library_id }, (err, updatedLibData) => {
                        if (err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
                        return sendSuccess(res, updatedLibData);
                      });
                }
            );
        });
  }

exports.getLibrary = async (req, res) => {
    var {library_id} = req.body
    Library.aggregate([
        {
          '$lookup': {
            'from': 'books', 
            'localField': '_id', 
            'foreignField': 'library_id', 
            'as': 'books'
          }
        }, {
          '$match': {
            '_id': mongoose.Types.ObjectId(library_id)
          }
        }, {
          '$lookup': {
            'from': 'admins', 
            'localField': 'admin_id', 
            'foreignField': '_id', 
            'as': 'admin_details'
          }
        }
      ]).then(response => {
        return sendSuccess(res, response)
      }).catch((err) => {
        return sendError(res, err, "server_error", constants.SERVER_ERROR);
      });
}

exports.issueBook = (req, res) => {
    var book_id = req.params.book_id;
    var student_id = req.body.student_id;
    var history_id = req.body.history_id;
    var findHistory = { _id: history_id };
    var update_book = { book_status: 2 };
    var update_history = { issued_at: Date.now() };

    Book.findByIdAndUpdate({ _id: book_id }, update_book , function(err, book) {
        if(err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
        if(history_id) {
            History.findOneAndUpdate(findHistory , update_history , { new: true}, function(err, history) {
                if(err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
                return sendSuccess(res, history);
            });
        } else {
            console.log("Not Found!!!");
            var history = new History({
                book_id: book_id, 
                student_id: student_id, 
                issued_at: Date.now()
            });
            history.save(history, function(err, historySave) {
                if(err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
                return sendSuccess(res, historySave);
            });
        }
    }); 
};

exports.returnBook = (req, res) => {
    var history_id = req.body.history_id;
    var update_book = { book_status: 1 };
    var update_history = { returned_at: Date.now() };

    History.findByIdAndUpdate({ _id: history_id }, update_history, function(err, history) {
        if(err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
        if(history) {
            if(history.issued_at) {
                if(history.returned_at) return sendError(res, err, "Book already returned", constants.SERVER_ERROR);
                var book_id = history.book_id;
                Book.findByIdAndUpdate({ _id: book_id }, update_book, function(err, book) {
                    if(err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
                    History.findById({ _id: history_id }, function(err, newHistory) {
                        if(err) return sendError(res, err, "server_error", constants.SERVER_ERROR);
                        return sendSuccess(res, newHistory);
                    });
                });
            } else {
                return sendError(res, err, "Book not issued", constants.SERVER_ERROR);
            }
        } else {
            return sendError(res, err, "Issue history not found", constants.SERVER_ERROR);
        }
    }); 
};

//Returns all available books with their count.
exports.availableBooks = (req, res) => {
    var library_id = req.params.library_id;
    Book.aggregate([
        {
            '$facet' : {
                "book_data": [{
                    '$match' : { 
                    'library_id' : mongoose.Types.ObjectId(library_id), 
                    'book_status': 1 
                    }
                }],
                
                "book_count": [{
                    '$match' : { 
                        'library_id' : mongoose.Types.ObjectId(library_id), 
                        'book_status': 1 
                    }   
                },
                    {
                        '$count' : "available_books"
                    }
                ]
            }
        }
      ]).then(response => {
        return sendSuccess(res, response)
      }).catch((err) => {
        return sendError(res, err, "server_error", constants.SERVER_ERROR);
      });
}

//Returns all issued books with their count.
exports.issuedBooks = (req, res) => {
    var library_id = req.params.library_id;
    Book.aggregate([
        {
            '$facet' : {
                "book_data": [{
                    '$match' : { 
                    'library_id' : mongoose.Types.ObjectId(library_id), 
                    'book_status': 2 
                    }
                }],
                
                "book_count": [{
                    '$match' : { 
                        'library_id' : mongoose.Types.ObjectId(library_id), 
                        'book_status': 2 
                    }   
                },
                    {
                        '$count' : "issued_books"
                    }
                ]
            }
        },
      ]).then(response => {
        return sendSuccess(res, response)
      }).catch((err) => {
        return sendError(res, err, "server_error", constants.SERVER_ERROR);
      });
}