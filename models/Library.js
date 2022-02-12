var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var LibrarySchema = new Schema(
  {
    admin_id: { type: ObjectId, required: true },
    library_name: { type: String, required: true },
    library_address: { type: String, required: true },
    library_city: { type: String, required: true },
    library_state: { type: String, required: true },
    library_contact: { type: String, required: true, unique: true },
    status: { type: String, default: "active" }, // for reports -> inactive/active
    avatar: { type: String },
    library_review: [
      {
        student_id: { type: ObjectId },
        review_stars: { type: Number },
        feedback: { type: String },
      },
    ],
    pending_request: [
      {
        _id : false,
        student_id: ObjectId,
        requested_at: { type: Date, default: new Date() },
      },
    ],
    accepted_student: [
      {
        _id : false,
        student_id: { type: ObjectId },
        added_at: { type: Date, default: new Date() },
      },
    ],
  },
  {
    timestamps: true,
  }
);

mongoose.model("Library", LibrarySchema);
