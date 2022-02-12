var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var StudentSchema = new Schema(
  {
    role: { type: Number, default: 1 },
    student_name: { type: String, required: true },
    student_contact: { type: String, required: true, unique: true },
    student_city: { type: String, required: true },
    student_state: { type: String, required: true },
    student_dob: { type: Date, required: true },
    status: { type: String, default: "active" }, // for reports -> inactive/active
    student_email: { type: String, required: true, unique: true },
    student_password: { type: String, required: true },
    is_verified: { type: Boolean, default: false },
    vrfy_at: { type: String },
    avatar: { type: String },
    login_type: { type: String, required: true },
    favourites: {
      librarires: [{ id: { type: String } }],
    },
    librarires: [
      { 
        _id : false,
        library_id: ObjectId, 
        added_at: { type: Date, default: new Date() } 
      },
    ],
    library_request: [
      {
        _id : false,
        library_id: { type: ObjectId },
        requested_at: { type: Date, default: new Date() },
      },
    ],
  },
  {
    timestamps: true,
  }
);

StudentSchema.pre("save", function (next) {
  var user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    //hash the paasword with our new salt
    bcrypt.hash(user.student_password, salt, function (err, hash) {
      if (err) return next(err);

      user.student_password = hash;
      next();
    });
  });
});

StudentSchema.methods.comparePassword = function (candidatePassword, cb) {
  var user = this;
  bcrypt.compare(
    candidatePassword,
    user.student_password,
    function (err, isMatch) {
      if (err) return cb(err, null);
      cb(null, isMatch);
    }
  );
};

mongoose.model("Student", StudentSchema);
