import React from "react";
import WorkoutForm from "../components/WorkoutForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WorkoutPlan = () => {
  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", padding: "20px" }}>
        Generate Your Personalized Workout Plan
      </h1>
      <WorkoutForm />
      <Footer />
    </div>
  );
};

export default WorkoutPlan;
