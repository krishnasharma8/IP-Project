import React from "react";
import DietForm from "../components/DietForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DietPlan = () => {
  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", padding: "20px" }}>Generate Your Personalized Diet Plan</h1>
      <DietForm />
      <Footer />
    </div>
  );
};

export default DietPlan;
