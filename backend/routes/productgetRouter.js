const express = require("express");
const productgetRouter = express.Router();
const Product = require("../models/addproduct");
const jwt = require("jsonwebtoken");


function verifyEmail(req, res, next) {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Authentication token is missing" });
    }
    const tokenWithoutBearer = token.replace("Bearer ", "");
    
    try {
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY);
        const userEmail = decoded.email;
        req.userEmail = userEmail;

        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

productgetRouter.get("/home", verifyEmail, async (req, res) => {
    try {
        const products = await Product.find({ email: req.userEmail });
        const productsWithImages = products.map((product) => ({
            ...product.toObject(),
            productImage: {
                data: product.productImage.toString("base64"),
                contentType: product.productImage.contentType, 
            },
        }));
        res.status(200).json(productsWithImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = productgetRouter;
