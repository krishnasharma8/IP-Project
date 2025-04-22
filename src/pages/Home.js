import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./styles.css"; // Import the CSS file
// import { div } from "framer-motion/client";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div style={{background: "black"}}>

      <Navbar/>

      <div style={{
        backgroundImage: "url('/assets/pic1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "90vh"
        }}>
      </div>


      <div className="text-container" >
        {/* Scrolling Text Behind */}
        <div className="scrolling-text-container">
          <div className="scrolling-text">LIFE FITNESS • LIFE FITNESS • LIFE FITNESS •</div>
        </div>

        {/* Main Header Text */}
        <header className="home-header" style={{color: "white"}}>
          {isAuthenticated && <h2 className="welcome-text" style={{ color: "white" }}>Hi, {user.name} 👋</h2>}
          <h1 className="main-title" style={{ color: "white" }}>WELCOME&nbsp;&nbsp;&nbsp;TO&nbsp;&nbsp;&nbsp;POWER-UP</h1>
          <h1 className="main-title" style={{ color: "white" }}>An AI Gym Trainer</h1>
        </header>
      </div>
      

<div className="button-container">
          <Link to="/workoutSession" className="btn blue-btn">
            Start Workout
          </Link>
          <Link to="/workoutPlan" className="btn green-btn">
            Generate Workout Plan
          </Link>
          <Link to="/dietPlan" className="btn red-btn">
            Generate Diet Plan
          </Link>
        </div>

<div style={{
        backgroundImage: "url('/assets/gif1.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "95vh"
        }}>
      </div>

        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
         <h1 className="main-title" style={{justifyContent:"center", alignItems:"center" , color: "white" }}>Sweat now, shine later.</h1>
      </div>
      <Footer />

    </div>
  );
};

export default Home;