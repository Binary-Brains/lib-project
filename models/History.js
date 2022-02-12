var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var HistorySchema = new Schema(
  {
    book_id: { type: ObjectId, required: true },
    student_id: { type: ObjectId, required: true },
    library_id: { type: ObjectId, required: true },
    issued_at: { type: Date }, //by default issue time will the creation time
    booked_at: { type: Date }, //if the user has made a book request then that time will be added over her
    returned_at: { type: Date },
  },
  {
    timestamps: true,
  }
);

//we have to run a cron that if the booked_at field id populated and after one day issued at is not filled then we have to delete 
//the collection

mongoose.model("History", HistorySchema);
