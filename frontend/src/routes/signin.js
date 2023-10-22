import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./css/signin.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start loading

      const response = await fetch("https://inventory-managemenmt.vercel.app/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response?.status === 200) {
        const data = await response.json();
        const token = data?.token;
        localStorage.setItem("token", token);
        navigate("/home"); 
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <Navbar />

      <div className="signin-background">
        <div className="signin">
          <h1 className="headtitle2">Sign In</h1>
          <form>
            <div>
              <label className="inputtitle">Email:</label>
              <input
                className="inputfield1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="inputtitle">Password:</label>
              <input
                className="inputfield1"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="buttonSignin"
              type="button"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            {isLoading ? <div>Loading...</div> : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
