const express = require("express");
const router = express.Router();
const passport = require("passport");
const asyncWrap = require("../utils/asyncwrap.js");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");

router
   .route("/signup")
   .get(userController.renderSignupForm)
   .post(asyncWrap(userController.signUp));

router
   .route("/login")
   .get(userController.renderLoginForm)
   .post(
     saveRedirectUrl,
     passport.authenticate('local',{
     failureRedirect : '/login' , failureFlash : true,
   }),userController.logIn,
);

router.get("/logout",userController.logOut);

module.exports = router;