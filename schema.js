const joi = require("joi");

module.exports.listingSchema = joi.object({
        listing : joi.object({
           title : joi.string().min(5).required().pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
           description : joi.string().min(5).required().pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
           image : joi.string().allow("",null),
           price : joi.number().integer().min(0),
           location : joi.string().min(3).required().pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
           country : joi.string().min(3).required().pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
           category : joi.string().required().pattern(/^[A-Za-z]{3,}$/),
       }).required() 
});

module.exports.reviewSchema = joi.object({
      review : joi.object({
        rating : joi.number().required().min(1).max(5),
        comment : joi.string().required().min(5),
      }).required()
});

module.exports.signSchema = joi.object({
    username : joi.string().required().min(3).pattern(/^(?=.{3,}$)[A-Za-z]+(?: [A-Za-z]+)?$/),
    email : joi.string().required().min(5).pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/),
    password : joi.string().required().min(8).pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z][A-Za-z\d@$!%*?&]{7,}$/),
});

module.exports.logSchema = joi.object({
    username : joi.string().required().min(3).pattern(/^(?=.{3,}$)[A-Za-z]+(?: [A-Za-z]+)?$/),
    password : joi.string().required().min(8).pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z][A-Za-z\d@$!%*?&]{7,}$/),
});

module.exports.searchSchema = joi.object({
    location : joi.string().min(3).pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
    country : joi.string().min(3).pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
    price : joi.number().min(0)
});