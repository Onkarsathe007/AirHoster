const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("./models/listing.js"); //accessing the model

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require("path");
app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

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

// //test listing 
// app.get("/testListing",async (req,res)=>{
//     let sampleListing  = new Listing({
//         title : "My new villa",
//         description : "By the beach",
//         price : 999000,
//         location : "Ratnagiri, Maharashtra",
//         country : "India",
//     });
//     await sampleListing.save().then((result)=>{
//     console.log(result," saved !");
//     res.send("Successful testing")
//     });
// });

app.get("/listings",async (req,res)=>{
    //accessing all the data from mongoDB to 'allListings' Variable.
    let allListings =  await Listing.find({});
    res.render("./listings/index.ejs",{allListings : allListings});
})

// new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//new route | Post request to add the data |
app.post("/listings/new", (req, res) => {
    const { title, description, imgLink, price,location, country } = req.body;
    console.log(req.body.listing); // Logs the entire listing object
    // console.log(title, description, imgLink, price, country); // Logs individual properties
    // res.send("Form submitted!");
    Listing.insertMany([
        {
            title: title,
            description: description,
            image: imgLink,
            price: price,
            location : location,
            country : country,
        }
    ]).then((res)=>{
        console.log("data saved successfully ");
    }).catch((err)=>{
        console.log("Error Occured ");
    })
    res.redirect("/listings")
});


//show route 
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listData =  await Listing.findById(id);
    console.log(listData);
    res.render("listings/show.ejs",{ listing : listData})
});