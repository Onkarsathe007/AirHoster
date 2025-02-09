const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Definig an schema 
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: Object,  // Change from String to Object
        default: {
            filename: '',
            url: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        set: (v) => {
            // Ensure the value is an object with a url property.
            return typeof v === 'string' ? { url: v } : v;
        }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

// exporting the module 
module.exports = Listing;