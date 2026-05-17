const express = require("express");
const router = express.Router();
const passport = require("passport");
const asyncWrap = require("../utils/asyncwrap.js");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");
const {validateSignin,validatelogin} = require("../middleware.js");

router
   .route("/signup")
   .get(userController.renderSignupForm)
   .post(
   validateSignin, 
   asyncWrap(userController.signUp));

router
   .route("/login")
   .get(userController.renderLoginForm)
   .post(
     validatelogin,
     saveRedirectUrl,
     passport.authenticate('local',{
     failureRedirect : '/login' , failureFlash : true,
   }),userController.logIn,
);

router.get("/logout",userController.logOut);

module.exports = router;