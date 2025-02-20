import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ background: "#333", padding: "10px", textAlign: "center" }}>
      <Link
        to="/"
        style={{ color: "white", margin: "10px", textDecoration: "none" }}
      >
        Home
      </Link>
      <Link
        to="/workoutSession"
        style={{ color: "white", margin: "10px", textDecoration: "none" }}
      >
        Workout Session
      </Link>
      <Link
        to="/workoutPlan"
        style={{ color: "white", margin: "10px", textDecoration: "none" }}
      >
        Workout Plan
      </Link>
      <Link
        to="/dietPlan"
        style={{ color: "white", margin: "10px", textDecoration: "none" }}
      >
        Diet Plan
      </Link>
    </nav>
  );
};

export default Navbar;
