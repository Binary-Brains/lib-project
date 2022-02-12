var express = require("express");
const {
  createAccount,
  verifyAccount,
  loginControlller,
  googleSignupController,
  errorController,
  requestController,
  reserveBook,
  studentData
} = require("../controllers/students");
const { runValidation } = require("../validators");
const {
  addAccountValidator,
  loginAccountValidator,
} = require("../validators/students");
const passport = require("passport");
const config = require("../config/config");
const { authStudent } = require("../utility/auth/auth_token");

var router = express.Router();

var userProfile, access_token;

//Google oAuth Passport
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { default: axios } = require("axios");
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_SECRET,
      callbackURL: "/api/student/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      token = accessToken;
      return done(null, userProfile);
    }
  )
);

//serialsing the user

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.post("/cr_acc", addAccountValidator, runValidation, createAccount);

router.get("/verify/:id", verifyAccount);

router.post("/login", loginAccountValidator, runValidation, loginControlller);

//google signup call
router.get(
  "/cr_acc/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email"
    ],
  })
);

//callback handler
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Registering profile of Student Google account
    // and saving it into the database in the profile schema
    // return res.json(userProfile)

    //following is the API which will get the result from google about the details

    //below code is use to fetch the particular data from google
    /*
        var field_name = "birthdays"
        var apiUrl = `https://people.googleapis.com/v1/people/${userProfile.id}?personFields=${field_name}&key=${config.GOOGLE_API_KEY}&access_token=${token}`
        axios.get(apiUrl).then(res => {
          console.log(res.data)
        }).catch(err => console.log(err.message))

    */
    googleSignupController(req, res, token, userProfile);
  }
);

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/error", errorController);

//send a connection request to a lib
router.post("/lib_rqst/:lib_id", requestController);
//create a reservation for a book
router.post("/reserve_book", authStudent, reserveBook);

router.get("/student_profile", authStudent, studentData);


module.exports = router;
