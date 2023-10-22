const express = require("express");
const importProductRouter = express.Router();
const Product = require("../models/addproduct");
const secretKey = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

importProductRouter.put("/importProduct", async (req, res) => {
    console.log("Request to /api/importProduct received");
    try {
        const { importproductName, importQuantity } = req.body;
        console.log("Import Product Name:", importproductName);
        console.log("Import Quantity:", importQuantity);

        const token = req.headers.authorization;
        if (!token) {
            console.log("Authentication token is missing");
            return res.status(401).json({ message: "Authentication token is missing" });
        }
        const tokenWithoutBearer = token.replace("Bearer ", "");
        const decoded = jwt.verify(tokenWithoutBearer, secretKey);
        const userEmail = decoded.email;

    
        const product = await Product.findOne({ productName: importproductName, email: userEmail });

        if (!product) {
            return res.status(404).json({ message: "Product not found for the user." });
        }
        if (isNaN(importQuantity)) {
            console.log("Import Quantity is not a valid number");
            return res.status(400).json({ message: "Import Quantity is not a valid number" });
        }
        const importQuantityNumber = Number(importQuantity);

        if (isNaN(importQuantityNumber)) {
            console.log("Invalid number format for Import Quantity");
            return res.status(400).json({ message: "Invalid number format for Import Quantity" });
        }

        
        product.productQuantity += importQuantityNumber;
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

module.exports = importProductRouter;



