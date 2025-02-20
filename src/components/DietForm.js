import React, { useState } from "react";
import { getDietPlan } from "../api/llamaApi";

const DietForm = () => {
  const [dietType, setDietType] = useState("vegetarian");
  const [primaryGoal, setPrimaryGoal] = useState("weight_loss");
  const [foodAllergies, setFoodAllergies] = useState("no");
  const [mealsPerDay, setMealsPerDay] = useState("3-4");
  const [mealPrepTime, setMealPrepTime] = useState("<15");
  const [initialWeight, setInitialWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [allergies, setAllergies] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Generating diet plan...");

    const response = await getDietPlan(
      dietType,
      primaryGoal,
      foodAllergies,
      mealsPerDay,
      mealPrepTime,
      initialWeight,
      targetWeight,
      allergies
    );

    setResult(response);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Personalized Diet Plan Generator</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "auto",
        }}
      >
        {/* Primary Goal */}
        <label>Primary Goal:</label>
        <select
          value={primaryGoal}
          onChange={(e) => setPrimaryGoal(e.target.value)}
        >
          <option value="weight_loss">Weight Loss</option>
          <option value="weight_gain">Weight Gain</option>
          <option value="maintenance">Maintenance</option>
        </select>

        {/* Diet Preference */}
        <label>Diet Preference:</label>
        <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
          <option value="vegetarian">Vegetarian</option>
          <option value="non_vegetarian">Non-vegetarian</option>
          <option value="gluten_free">Gluten-Free</option>
          <option value="dairy_free">Dairy-Free</option>
          <option value="no_preference">No Preference</option>
        </select>

        {/* Food Allergies */}
        <label>Do you have food allergies?</label>
        <select
          value={foodAllergies}
          onChange={(e) => setFoodAllergies(e.target.value)}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>

        {/* Specify Allergies */}
        {foodAllergies === "yes" && (
          <>
            <label>Specify Allergies:</label>
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="e.g. Nuts, Dairy, Gluten"
            />
          </>
        )}

        {/* Meals Per Day */}
        <label>Meals Per Day:</label>
        <select
          value={mealsPerDay}
          onChange={(e) => setMealsPerDay(e.target.value)}
        >
          <option value="1-2">1-2</option>
          <option value="3-4">3-4</option>
          <option value="5+">5+</option>
        </select>

        {/* Meal Prep Time */}
        <label>Preferred Meal Prep Time:</label>
        <select
          value={mealPrepTime}
          onChange={(e) => setMealPrepTime(e.target.value)}
        >
          <option value="<15">Less than 15 min</option>
          <option value="15-30">15-30 min</option>
          <option value="30+">30+ min</option>
        </select>

        {/* Initial Weight */}
        <label>Initial Weight (kg):</label>
        <input
          type="number"
          value={initialWeight}
          onChange={(e) => setInitialWeight(e.target.value)}
          required
        />

        {/* Target Weight */}
        <label>Target Weight (kg):</label>
        <input
          type="number"
          value={targetWeight}
          onChange={(e) => setTargetWeight(e.target.value)}
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

export default DietForm;
