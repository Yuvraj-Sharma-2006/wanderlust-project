const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const newData = require("./data.js");

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main().then(()=>{
    console.log("connect succesfully with database");
}).catch((err)=>{
     console.log(err);
});

async function initDB(){
    await Listing.deleteMany();
    newData.data = newData.data.map((obj) => ({...obj,owner : '69c9eb94732b7abdc2311889'}));
    await Listing.insertMany(newData.data);
}

initDB();