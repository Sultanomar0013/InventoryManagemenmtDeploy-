import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./Components/footer";
import Home from "./routes/home";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import AddNewProduct from "./routes/addProduct";
import ImportProduct from "./routes/importProduct";
import SellProduct from "./routes/sellProduct";
//const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addProduct" element={<AddNewProduct />} />
        <Route path="/importProduct" element={<ImportProduct />} />
        <Route path="/sellProduct" element={<SellProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
