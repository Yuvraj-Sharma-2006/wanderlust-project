const express = require("express");
const router = express.Router({mergeParams : true});
const asyncWrap = require("../utils/asyncwrap.js");
const {validateReview , isLoggedIn ,isReviewAuthore} = require("../middleware.js");
const reviewController = require("../controllers/review.js");
//reviews
//post reviews
router.post("/",
    validateReview,
    isLoggedIn,
    asyncWrap(reviewController.createNewReview)
);

//delete reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthore,
    asyncWrap(reviewController.destroyReview)
);

module.exports = router;
