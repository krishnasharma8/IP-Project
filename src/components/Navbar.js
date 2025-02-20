import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ background: "#333", padding: "10px", textAlign: "center" }}>
      <Link to="/" style={{ color: "white", margin: "10px", textDecoration: "none" }}>Home</Link>
      <Link to="/workout" style={{ color: "white", margin: "10px", textDecoration: "none" }}>Workout Tracker</Link>
      <Link to="/diet" style={{ color: "white", margin: "10px", textDecoration: "none" }}>Diet Plan</Link>
    </nav>
  );
};

export default Navbar;
