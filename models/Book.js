var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BookSchema = new Schema(
  {
    library_id: { type: ObjectId, required: true },
    book_name: { type: String, required: true },
    book_pages: { type: Number, required: true },
    book_author: { type: String, required: true },
    book_publisher: { type: String, required: true },
    book_review: [
      {
        student_id: { type: ObjectId },
        review_stars: { type: Number },
        feedback: { type: String },
      },
    ],
    status: { type: String, default: "active" }, // for reports -> inactive/active
    book_status: { type: Number, required: true, default: 1 },
    thumbnail: { type: String },
  },
  {
    timestamps: true,
  }
);

BookSchema.statics = {
  STATUS: {
    AVAILABLE: 1,
    ISSUED: 2,
    BOOKED: 3
  },
};

mongoose.model("Book", BookSchema);
