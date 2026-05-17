const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title : {
        type: String,
        required : true,
        trim :true,
        minLength : 5,
        lowercase: true 
    },
    description : {
        type : String,
        trim : true,
        minLength : 5,
        lowercase: true 
    },
    image : {
        url : String,
        filename : String,
    },
    price : {
        type : Number,
        required : true
    },
    location : {
        type : String,
        minLength : 3,
        required :true,
        lowercase: true 
    },
    country : {
        type : String,
        minLength : 3,
        required :true,
        lowercase: true 
    },
    reviews : [
      {
        type : Schema.Types.ObjectId,
        ref : 'Review'
     }
   ],
   owner : {
      type : Schema.Types.ObjectId,
      ref : 'User',
   },
   geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category : {
    type : String,
    enum : ["trandings","mountains","amazing pools","iconic cities","rooms","camping","farms","arctic","casties","boating house"],
    required:true,
    lowercase: true 
  }
}); 

listingSchema.post("findOneAndDelete",async (listing)=>{
   console.log(listing);  
   await Review.deleteMany({_id : {$in : listing.reviews}}); 
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;