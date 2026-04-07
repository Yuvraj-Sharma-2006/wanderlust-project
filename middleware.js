const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema ,reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = ((req,res,next)=> {
    if(!req.isAuthenticated()){
       req.session.redirectUrl = req.originalUrl;
       req.flash("error","you must be loged in to create,change or delete a listing");
       return res.redirect('/login');
    }
    next();
});

module.exports.saveRedirectUrl = ((req,res,next)=>{
    if(req.session.redirectUrl){
       res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
});

module.exports.isOwner = (async (req,res,next)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you doesn't have permission to change this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
});

module.exports.validateListing = ((req,res,next)=>{
const {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
});

module.exports.validateReview = ((req,res,next)=>{
  const {error} = reviewSchema.validate(req.body);
  if(error){
     let errMsg = error.details.map(el => el.message).join(",");
     throw new ExpressError(400,errMsg);
  }else{
    next();
  }
});

module.exports.isReviewAuthore = (async (req,res,next)=>{
    const {id,reviewId} = req.params;
    const reviews = await Review.findById(reviewId);
    if(!reviews.authore._id.equals(res.locals.currUser._id)){
        req.flash("error","you doesn't have permission to change this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
});