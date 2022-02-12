var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AdminSchema = new Schema(
  {
    role: { type: Number, default: 2 },
    admin_name: { type: String, required: true },
    admin_contact: { type: String, required: true, unique: true },
    admin_city: { type: String, required: true },
    admin_state: { type: String, required: true },
    admin_dob: { type: Date, required: true },
    status: { type: String, default: "active" }, // for reports -> inactive/active
    admin_email: { type: String, required: true, unique: true },
    admin_password: { type: String, required: true },
    is_verified: { type: Boolean, default: false },
    vrfy_at: { type: Date },
    avatar: { type: String },
    library_id: { type: ObjectId },
    login_type: { type: String },
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre("save", function (next) {
  var user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    console.log(user.admin_password);
    //hash the paasword with our new salt
    bcrypt.hash(user.admin_password, salt, function (err, hash) {
      if (err) return next(err);

      user.admin_password = hash;
      next();
    });
  });
});

AdminSchema.methods.comparePassword = function (candidatePassword, cb) {
  var user = this;
  bcrypt.compare(
    candidatePassword,
    user.admin_password,
    function (err, isMatch) {
      if (err) return cb(err, null);
      cb(null, isMatch);
    }
  );
};

mongoose.model("Admin", AdminSchema);
