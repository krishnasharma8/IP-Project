import React, { useState } from "react";
import { getWorkoutPlan } from "../api/generateWorkoutPlan"; // Update the import to reflect workout plan function

const WorkoutForm = () => {
  const [fitnessLevel, setFitnessLevel] = useState("beginner");
  const [primaryGoal, setPrimaryGoal] = useState("weight_loss");
  const [availableEquipment, setAvailableEquipment] = useState("none");
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState("3");
  const [sessionDuration, setSessionDuration] = useState("30");
  const [initialFitness, setInitialFitness] = useState("");
  const [targetFitness, setTargetFitness] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Generating workout plan...");

    const response = await getWorkoutPlan(
      fitnessLevel,
      primaryGoal,
      availableEquipment,
      workoutsPerWeek,
      sessionDuration,
      initialFitness,
      targetFitness
    );

    setResult(response);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Personalized Workout Plan Generator</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "auto",
        }}
      >
        {/* Fitness Level */}
        <label>Fitness Level:</label>
        <select
          value={fitnessLevel}
          onChange={(e) => setFitnessLevel(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {/* Primary Goal */}
        <label>Primary Goal:</label>
        <select
          value={primaryGoal}
          onChange={(e) => setPrimaryGoal(e.target.value)}
        >
          <option value="weight_loss">Weight Loss</option>
          <option value="muscle_gain">Muscle Gain</option>
          <option value="strength">Strength</option>
          <option value="endurance">Endurance</option>
        </select>

        {/* Available Equipment */}
        <label>Available Equipment:</label>
        <select
          value={availableEquipment}
          onChange={(e) => setAvailableEquipment(e.target.value)}
        >
          <option value="none">None</option>
          <option value="dumbbells">Dumbbells</option>
          <option value="barbell">Barbell</option>
          <option value="gym">Gym</option>
          <option value="resistance_bands">Resistance Bands</option>
        </select>

        {/* Workouts Per Week */}
        <label>Workouts Per Week:</label>
        <select
          value={workoutsPerWeek}
          onChange={(e) => setWorkoutsPerWeek(e.target.value)}
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>

        {/* Session Duration */}
        <label>Session Duration (minutes):</label>
        <input
          type="number"
          value={sessionDuration}
          onChange={(e) => setSessionDuration(e.target.value)}
          required
        />

        {/* Initial Fitness */}
        <label>Initial Fitness Level:</label>
        <input
          type="text"
          value={initialFitness}
          onChange={(e) => setInitialFitness(e.target.value)}
          placeholder="e.g. beginner, moderate, advanced"
          required
        />

        {/* Target Fitness */}
        <label>Target Fitness Level:</label>
        <input
          type="text"
          value={targetFitness}
          onChange={(e) => setTargetFitness(e.target.value)}
          placeholder="e.g. strength, endurance, muscle gain"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
          }}
        >
          Generate Plan
        </button>
      </form>

      {/* Display Result */}
      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
};

export default WorkoutForm;
