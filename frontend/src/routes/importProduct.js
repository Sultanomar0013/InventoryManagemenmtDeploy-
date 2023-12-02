import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./css/importProduct.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const urlpro = `${backendUrl}/api/importProduct`; 
function ImportProduct() {
    const [importproductName, setProduct] = useState("");
    const [importQuantity, setImportQuantity] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    const handleImport = async (e) => {
        e.preventDefault();
        const data = {
            importproductName,
            importQuantity,
        };
        
        try {
            const response = await fetch(urlpro, {
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

            <div className="import-background">
                <div className="import">
                    <h1 className="importtitle2">Import Product Here</h1>
                    <form>
                        <div>
                            <label className="inputimporttitle">Product Name:</label>
                            <input
                                className="inputimportfield1"
                                type="text"
                                value={importproductName}
                                onChange={(e) => setProduct(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="inputimporttitle">Quantity:</label>
                            <input
                                className="inputimportfield1"
                                type="number"
                                value={importQuantity}
                                onChange={(e)=> setImportQuantity(e.target.value)}
                            />
                        </div>
                        <button
                            className="buttonImport"
                            type="button"
                            onClick={handleImport}
                        >
                            Import
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ImportProduct;