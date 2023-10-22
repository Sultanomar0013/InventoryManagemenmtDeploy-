const express = require("express");
const multer = require("multer");
const addProductrouter = express.Router();
const Product = require("../models/addproduct");

const secretKey = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");


const storage = multer.memoryStorage();
const upload = multer({ storage });

addProductrouter.post("/addProduct", upload.single("productImage"), async (req, res) => {
    try {
        const { productName, productType, productQuantity } = req.body;
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing" });
        }
        const tokenWithoutBearer = token.replace("Bearer ", "");
        const decoded = jwt.verify(tokenWithoutBearer, secretKey);
        const userEmail = decoded.email;
        
        
        const productImageBuffer = req.file.buffer;
        const product = new Product({
            productName,
            productType,
            productQuantity,
            productImage: {
                data: productImageBuffer,
                contentType: req.file.mimetype
            },
            email: userEmail,
        });

        await product.save();
        res.status(201).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = addProductrouter;

