import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import "./css/home.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const urlhome = `${backendUrl}/api/home`; 

function Home() {
  const [productList, setProductList] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProductList = useCallback(async () => {
    try {
      const response = await fetch(urlhome , {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProductList(data);
      } else {
        console.error("Failed to fetch product list");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [token]); 

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]); 

  return (
    <>
      <Navbar />

      <div className="Home">
        <div className="AddproductDiv">
          <ul className="AddproductUl">
            <div className="AddproductDiv1">
              <Link to="/addProduct">
                <button className="AddproductBtn">Add New Product</button>
              </Link>
              <Link to="/importProduct">
                <button className="AddproductBtn">Import Product</button>
              </Link>

              <Link to="/sellProduct">
                <button className="AddproductBtn">Sell Product</button>
              </Link>


              <button className="AddproductBtn">Invoice</button>

            </div>
          </ul>
        </div>
        <div className="product List">
          <h1> Product List </h1>
          <ul className="get-product">
            {productList.map((product) => (
              <div key={product._id} className="get-productli">
                <div className="product-item">
                  <img
                    src={`data:${product.productImage.contentType};base64,${product.productImage.data}`}
                    alt="Product"
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3>{product.productName}</h3>
                    <p>Quantity: {product.productQuantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </ul>



        </div>
      </div>
    </>
  );

};




export default Home;
