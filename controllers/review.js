const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
module.exports.createNewReview =  async (req,res)=> {
    const {id} = req.params;
    // console.log(id);
    let listing = await Listing.findById(id);
    let review = new Review(req.body.review);
    review.authore = req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success","new review created");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyReview =   async(req,res)=>{
    const {id,reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    req.flash("success","review Deleted !");
    res.redirect(`/listings/${id}`);
}