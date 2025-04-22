const API_TOKEN = process.env.REACT_APP_API_TOKEN; // Replace with your real token
const MODEL = "meta-llama/Meta-Llama-3-8B-Instruct";

export const getWorkoutPlan = async (
  fitnessLevel,
  primaryGoal,
  availableEquipment,
  workoutsPerWeek,
  sessionDuration,
  initialFitness,
  targetFitness
) => {
  const prompt = `
  Create a personalized workout plan for an individual with the following details:
  - Fitness Level: ${fitnessLevel}
  - Primary Goal: ${primaryGoal}
  - Initial Fitness: ${initialFitness}
  - Target Fitness: ${targetFitness}
  - Available Equipment: ${availableEquipment ? availableEquipment : "None"}
  - Workouts per week: ${workoutsPerWeek}
  - Session Duration: ${sessionDuration} minutes

  Provide a **structured** workout plan including:
  - Warm-up exercises
  - Main workout (with specific exercises, sets, and reps)
  - Cool-down exercises
  - Any additional fitness tips or recommendations
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
          parameters: { max_new_tokens: 400, temperature: 0.7 },
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
    console.error("Error fetching workout plan:", error);
    return `API request failed: ${error.message}`;
  }
};
