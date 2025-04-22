const API_TOKEN = process.env.REACT_APP_API_TOKEN; // Replace with your real token
const MODEL = "meta-llama/Meta-Llama-3-8B-Instruct";

export const getDietPlan = async (
  dietType,
  primaryGoal,
  foodAllergies,
  mealsPerDay,
  mealPrepTime,
  initialWeight,
  targetWeight,
  allergies
) => {
  const prompt = `
  Create a personalized diet plan for a ${dietType} individual.
  - Primary Goal: ${primaryGoal}
  - Initial weight: ${initialWeight} kg
  - Target weight: ${targetWeight} kg
  - Food Allergies: ${foodAllergies === "yes" ? allergies : "None"}
  - Meals per day: ${mealsPerDay}
  - Preferred meal prep time: ${mealPrepTime} minutes

  Provide a **structured** daily meal plan including:
  - Breakfast
  - Lunch
  - Dinner
  - Snacks (if applicable)
  - Calories per meal
  - Any additional health tips
  `;

  try {
    console.log("Sending API request...");

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 300, temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    return data[0]?.generated_text || "Failed to generate plan.";
  } catch (error) {
    console.error("Error fetching diet plan:", error);
    return `API request failed: ${error.message}`;
  }
};
