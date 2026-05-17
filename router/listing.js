const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncwrap.js");
const {isLoggedIn ,validateListing ,isOwner,validateSearch} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloundConfig.js");
const upload = multer({storage});
//create 
//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.get("/search",
    validateSearch,
    asyncWrap(listingController.searchListing)
);

router.get("/category/:cat",
    asyncWrap(listingController.filteredListing)
);


router.
    route("/")
    .get(asyncWrap(listingController.index))//index router(read)
    .post(//create new listingsS
      isLoggedIn,
      upload.single('listing[image]'),
      asyncWrap(
      listingController.createNewListing));

router
    .route("/:id")
    .get(asyncWrap(listingController.showListing))//show router
    .put(//update router
      isLoggedIn,
      isOwner,
      upload.single('listing[image]'),
      validateListing,
      asyncWrap(listingController.updateListing))
    .delete(//delete router
      isLoggedIn,
      isOwner,
      asyncWrap(listingController.destroyListing)
);

//update
//edit routes
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    asyncWrap(listingController.renderEditForm)
);

module.exports = router;