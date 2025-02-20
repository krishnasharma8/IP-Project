import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WorkoutTracker from "./pages/WorkoutTracker";
import DietPlan from "./pages/DietPlan";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout" element={<WorkoutTracker />} />
        <Route path="/diet" element={<DietPlan />} />
      </Routes>
    </Router>
  );
};

export default App;
