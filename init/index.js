const mongoose = require("mongoose");
let initData = require("./data.js");
const listing = require("../models/listing.js");
// '..' for data of the outer folder .

//setting up the database
let mongoUrl = 'mongodb://127.0.0.1:27017/wanderlust';
async function main() {
    await mongoose.connect(mongoUrl);
}

main().then((res) => {
    console.log("Conneted to DB");
    initDB();                        // async will does'nt call automatically
}).catch((err) => {
    console.log(err);
});

const initDB = async () => {
    await listing.deleteMany({});
    console.log("Old data cleared")
    await listing.insertMany(initData.data);
    console.log('Data was inititalized');
}