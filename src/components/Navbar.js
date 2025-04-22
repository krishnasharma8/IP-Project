import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
// import { color } from "framer-motion";

const Navbar = () => {
  const {user, loginWithRedirect, isAuthenticated, logout} = useAuth0()
  return (
    <nav style={{display:"flex", background: "#00001a", padding: "10px", textAlign: "center", justifyContent: "space-between", alignItems: "center"}}>
      <div><h3 style={{ color: "white"}}>Power-Up</h3></div>

      <div>
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
      {/* <Link
        to="/dietPlan"
        style={{ color: "white", margin: "10px", textDecoration: "none" }}
      >
        Diet Plan
      </Link> */}
      </div>

      <div>
      {
        isAuthenticated ? (<button onClick={(e)=>logout()}>Logout</button>) : (<button onClick={(e) => loginWithRedirect()}>Login</button>)
      }
      </div>
      
    </nav>
  );
};

export default Navbar;
