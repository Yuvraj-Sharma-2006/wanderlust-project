const joi = require("joi");

module.exports.listingSchema = joi.object({
        listing : joi.object({
           title : joi.string().min(5).required(),
           description : joi.string().min(5).required(),
           image : joi.string().allow("",null),
           price : joi.number().integer().min(0),
           location : joi.string().min(3).required(),
           country : joi.string().min(3).required(),
       }).required() 
});

module.exports.reviewSchema = joi.object({
      review : joi.object({
        rating : joi.number().required().min(1).max(5),
        comment : joi.string().required().min(5),
      }).required()
});
