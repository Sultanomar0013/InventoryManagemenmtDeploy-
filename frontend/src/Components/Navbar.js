import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Link, NavLink } from "react-router-dom";
import "./css/Navbar.css";

function Navbar() {
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    const updatedToken = localStorage.getItem("token");
    setToken((prevToken) => {
      if (prevToken !== updatedToken) {
        return updatedToken;
      }
      return prevToken;
    });
    setLoading(false);
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="" className="navbar-logo">
              Inventory Management System
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <div className="nav-item1">
            
                {token?.length > 5 ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        to="/home"
                        className={({ isActive }) =>
                          "nav-links" + (isActive ? " activated" : "")
                        }
                        onClick={closeMobileMenu}
                      >
                        Home
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          "nav-links" + (isActive ? " activated" : "")
                        }
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          "nav-links" + (isActive ? " activated" : "")
                        }
                      >
                        SignIn
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                          "nav-links" + (isActive ? " activated" : "")
                        }
                      >
                        SignUp
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
