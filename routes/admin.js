const express = require("express");
const {
  createAccount,
  verifyAccount,
  loginControlller,
  adminData,
  editAdminController,
  googleSignupController,
} = require("../controllers/admin");
const { sendSuccess } = require("../utility/helper");
const { runValidation } = require("../validators");
const {
  addAccountValidator,
  loginAccountValidator,
} = require("../validators/admin");
const router = express.Router();
const passport = require("passport");
const config = require("../config/config");

//Google oAuth Passport
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { default: axios } = require("axios");
const { authAdmin } = require("../utility/auth/auth_token");
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_SECRET,
      callbackURL: "/api/admin/google/callback",
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

router.get("/", (req, res) => {
  return sendSuccess(res, { msg: "You are in admin routes" });
});

router.post("/cr_acc", addAccountValidator, runValidation, createAccount);

router.get("/verify/:id", verifyAccount);

router.post("/login", loginAccountValidator, runValidation, loginControlller);

router.get(
  "/cr_acc/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

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

router.get("/admin_profile", authAdmin, adminData);

router.post("/edit_admin", authAdmin, editAdminController);

module.exports = router;
