import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./css/sellProduct.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const url = `${backendUrl}/api/sellProduct`; 
function SellProduct() {
    const [sellproductName, setsellProduct] = useState("");
    const [sellQuantity, setSellQuantity] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    const handleSell = async (e) => {
        e.preventDefault();
        const data = {
            sellproductName,
            sellQuantity,
        };
        
        try {
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(data), 
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json", 
                },
            });
    
            console.log("Response:", response);
    
            if (response.ok) {
                navigate("/home");
            } else {
                console.error("Failed to import product");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="sell-background">
                <div className="sell">
                    <h1 className="selltitle2">Sell Product Here</h1>
                    <form>
                        <div>
                            <label className="inputsellrtitle">Product Name:</label>
                            <input
                                className="inputsellfield1"
                                type="text"
                                value={sellproductName}
                                onChange={(e) => setsellProduct(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="inputselltitle">Quantity:</label>
                            <input
                                className="inputsellfield1"
                                type="number"
                                value={sellQuantity}
                                onChange={(e) => setSellQuantity(e.target.value)}
                            />
                        </div>
                        <button
                            className="buttonSell"
                            type="button"
                            onClick={handleSell}
                        >
                            S e l l 
                        </button>
                    
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SellProduct;