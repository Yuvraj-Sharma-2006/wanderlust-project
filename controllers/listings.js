const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding.js');
const mapToken = process.env.Map_Token;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.renderNewForm = (req,res)=>{
    res.render("./listing/new.ejs");
}

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find();
    res.render("./listing/index.ejs",{allListings});
}

module.exports.createNewListing =  async (req,res)=>{
    const listing = new Listing(req.body.listing);
    const response =await geocodingClient.forwardGeocode({
          query: listing.location,
          limit: 1,
          }).send();
    
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = {url,filename};
    listing.owner = req.user._id;
    console.log(response.body.features[0].geometry);
    listing.geometry = response.body.features[0].geometry;
    // console.log(listing);
    await listing.save();
    req.flash("success","new Listing Created");
    res.redirect("./listings");
};

module.exports.showListing = async(req,res)=>{
    const {id} = req.params; 
    const listing = await Listing.findById(id)
                    .populate({
                        path : "reviews",
                          populate : {
                            path : "authore",
                        },
                    })
                    .populate("owner");
    // console.log(listing);
    if(!listing){
        req.flash("error","listing you request is not exist");
        return res.redirect("/listings");
    }
    res.render("./listing/show.ejs",{listing});
}

module.exports.renderEditForm = async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error","listing you request is not exist");
        return res.redirect("/listings");
    }
    // console.log(listing);
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload","/upload/h_125,w_250/b_rgb:3448C5");
    // console.log(originalImage);
    res.render("./listing/edit",{listing,originalImage});
}

module.exports.updateListing = async (req,res)=>{
    const {id} = req.params;
    // console.log(id);
    const listing = await Listing.findByIdAndUpdate(id,{...req.body.listing}); 
    // console.log(listing);
    if(typeof req.file !== "undefined"){
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = {url,filename};
        listing.save();
    }
    req.flash("success","Listing updated ");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id); 
    req.flash("success","Listing deleted ");
    res.redirect(`/listings`);
};