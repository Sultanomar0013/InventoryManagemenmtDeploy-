import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import "./css/addProduct.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const url = `${backendUrl}/api/addProduct`; 

function AddNewProduct() {
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productType", productType);
        formData.append("productQuantity", productQuantity);
        formData.append("productImage", selectedImage);
        try {
            const response = await fetch(url , {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                navigate("/home");
            } else {
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="addProduct-background">
                <div className="addProduct">
                    <h1 className="titleAddproduct">Add New product </h1>
                    <form onSubmit={handleSubmit}>
                        <label className="addProductLabel">
                            Product Name:
                            <input
                                className="Inputbox2"
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </label>
                        <label className="addProductLabel">
                            Product Type:
                            <input
                                className="Inputbox2"
                                type="text"
                                value={productType}
                                onChange={(e) => setProductType(e.target.value)}
                            />
                        </label>
                        <label className="addProductLabel">
                            Product Quantity:
                            <input
                                className="Inputbox2"
                                type="number"
                                value={productQuantity}
                                onChange={(e) => setProductQuantity(e.target.value)}
                            />
                        </label>
                        <label htmlFor="imageUpload addProductLabel">Product Image:</label>
                        <input
                            type="file"
                            className="Inputbox3"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <button className="AddProductbutton1" type="submit">
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddNewProduct;