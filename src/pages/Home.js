import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <header style={{ textAlign: "center", padding: "50px" }}>
        <h1>Welcome to AI Gym Trainer</h1>
        <p>Track workouts & generate personalized diet plans.</p>
        <div style={{ marginTop: "20px" }}>
          <Link to="/workout" style={{ margin: "10px", padding: "10px", backgroundColor: "blue", color: "white", textDecoration: "none" }}>Start Workout</Link>
          <Link to="/diet" style={{ margin: "10px", padding: "10px", backgroundColor: "green", color: "white", textDecoration: "none" }}>Generate Diet Plan</Link>
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default Home;
