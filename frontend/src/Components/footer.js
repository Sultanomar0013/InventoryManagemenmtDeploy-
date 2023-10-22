//Footer.js

import React from "react";
import "./css/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Inventory Management System</p>
    </footer>
  );
}

export default Footer;
