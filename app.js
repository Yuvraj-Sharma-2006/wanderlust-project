if(process.env.NODE_ENV != "production"){
   require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate =  require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./router/listing.js");
const reviewRouter = require("./router/review.js");
const asyncWrap = require("./utils/asyncwrap.js");
const listingController = require("./controllers/listings.js");
const session = require("express-session");
const {MongoStore} = require('connect-mongo');
console.log(MongoStore);
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./router/user.js");
const port = 8080;

const mongo_url= process.env.ATLAS_URL;
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./views"));
app.use(express.static(path.join(__dirname,"./public/javascript")));
app.use(express.static(path.join(__dirname,"./public/css")));
app.use(express.static(path.join(__dirname,"./public/assets")));
app.use(express.urlencoded({extended :true}));
app.use(methodOverride("_method"));

async function main(){
    // mongoose.connect(mongo_url);
     await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main().then(()=>{
    console.log("connect succesfully with database");
}).catch((err)=>{
     console.log(err);
});

const sessionStore = MongoStore.create({
    // mongoUrl: mongo_url,
    mongoUrl: 'mongodb://127.0.0.1:27017/wanderlust',
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter: 24 * 3600,
    ttl: 30 * 24 * 60 * 60
});
const sessionOptions = {
    store : sessionStore, 
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() +  30 * 24 * 60 * 60 * 1000,
        maxAge : 14 * 24 * 60 * 60 * 1000,
        httpOnly :true
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/",asyncWrap(listingController.index));
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

// app.get("/demoUser",async (req,res)=>{
//     const fakeUser = new User({
//         email : 'student@gmail.com',
//         username : 'deleta-student'
//     });

//     let user = await User.register(fakeUser,"hello world");
//     res.send(user);
// });

app.use((req,res,next)=>{
   next(new ExpressError(404,"page not found!"));
});

app.use((err,req,res,next)=>{
   const {statusCode=500,message="somethings goes wrong!"} = err;
   res.status(statusCode).render("./error.ejs",{message});
//    next(err);
});

app.listen(port,()=>{
     console.log(`listen request on port ${port}`);
});