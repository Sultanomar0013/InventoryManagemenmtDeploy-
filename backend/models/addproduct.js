const mongoose = require("mongoose");

const addProductSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
        
    },
    productType: {
        type: String,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productImage: {
        data:String,
        contentType: String
    }
});

const Product = mongoose.model("Product", addProductSchema);

module.exports = Product;