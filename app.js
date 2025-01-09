const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("./models/listing.js"); //accessing the model

let port  = 8080;

//setting up the server
app.listen(8080,()=>{
    console.log("Server is listening ",port);
});

//setting up the database
let mongoUrl = 'mongodb://127.0.0.1:27017/wanderlust'; 
async function main(){
    await mongoose.connect(mongoUrl);
}

main().then((res)=>{
    console.log("Conneted to DB");
}).catch((err)=>{
    console.log(err);
});


//root API
app.get("/",(req,res)=>{
    res.send("Hi, I am root!");
})
