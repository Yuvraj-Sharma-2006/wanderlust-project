const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
     res.render("users/signup.ejs");
};

module.exports.signUp = async(req,res)=>{
  try{
    const {username,email,password} = req.body;
    const user = new User({username,email}); 
    const registerUser = await User.register(user,password);
   //  console.log(registerUser);
    req.login(registerUser,(err)=>{
       if(err){
          next(err);
       }
      req.flash("success","welcome to the wanderlust");
      res.redirect("/");
    });
  }catch(e){
     req.flash("error" , "user is already register");
     res.redirect("/signup");
  };
};

module.exports.renderLoginForm = (req,res)=>{
   res.render("users/login.ejs");
};

module.exports.logIn = async(req,res)=>{
    console.log(req.body);
     req.flash("success","welcome back to wanderlust");
   //   console.log(res.locals.redirectUrl);
     const redirectUrl = res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl);
}; 

module.exports.logOut = (req,res,next)=>{
   req.logout((err) => {
      if(err){
         next(err);
      }
      req.flash("success" , "you are logged out from wanderlust!");
      res.redirect("/");
   });
};