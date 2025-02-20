import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WorkoutTracker from "./pages/WorkoutSession";
import DietPlan from "./pages/DietPlan";
import WorkoutPlan from "./pages/WorkoutPlan";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workoutSession" element={<WorkoutTracker />} />
        <Route path="/dietPlan" element={<DietPlan />} />
        <Route path="/workoutPlan" element={<WorkoutPlan />} />
      </Routes>
    </Router>
  );
};

export default App;
