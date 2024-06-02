
const mongoose = require("mongoose");
require('dotenv').config();


var mongoURL = 'mongodb+srv://srishylam:rksrishylam@cluster0.znq56lv.mongodb.net/mern-pizza-delivery'

mongoose.connect(mongoURL, {useUnifiedTopology:true , useNewUrlParser:true})

var db = mongoose.connection

db.on("connected" , ()=>{
    console.log("Mongo DB Connection Successfull");
})

db.on("error", ()=>{
    console.log("Mongo DB Connection Failed");    
})

module.exports = mongoose