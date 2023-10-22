const express = require("express");
const sellProductRouter = express.Router();
const Product = require("../models/addproduct");
const secretKey = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

sellProductRouter.put("/sellProduct", async (req, res) => {
    console.log("Request to /api/importProduct received");
    try {
        const { sellproductName, sellQuantity } = req.body;
        console.log("Import Product Name:", sellproductName);
        console.log("Import Quantity:", sellQuantity);

        const token = req.headers.authorization;
        if (!token) {
            console.log("Authentication token is missing");
            return res.status(401).json({ message: "Authentication token is missing" });
        }
        const tokenWithoutBearer = token.replace("Bearer ", "");
        const decoded = jwt.verify(tokenWithoutBearer, secretKey);
        const userEmail = decoded.email;

        
        const product = await Product.findOne({ productName: sellproductName, email: userEmail });

        if (!product) {
            return res.status(404).json({ message: "Product not found for the user." });
        }
        if (isNaN(sellQuantity)) {
            console.log("sell Quantity is not a valid number");
            return res.status(400).json({ message: "sell Quantity is not a valid number" });
        }
        const sellQuantityNumber = Number(sellQuantity);

        if (isNaN(sellQuantityNumber)) {
            console.log("Invalid number format for Sell Quantity");
            return res.status(400).json({ message: "Invalid number format for Sell Quantity" });
        }

        
        product.productQuantity -= sellQuantityNumber;
        await product.save();
        console.log(product);

        console.log("Product quantity updated successfully.");
        res.status(200).json({ message: "Product quantity updated successfully." });
    } catch (error) {
        console.error(error);
        console.log("Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = sellProductRouter;