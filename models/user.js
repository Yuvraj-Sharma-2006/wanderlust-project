const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");//this is a object
const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
    }
});

UserSchema.plugin(passportLocalMongoose.default);//this is a function

module.exports = mongoose.model("User",UserSchema);