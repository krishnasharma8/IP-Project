export const detectSquat = (pose, exerciseState, setRepCount, setFeedback, setCalories) => {
  if (!pose || !pose.keypoints) return;     
  
  const hipKeypoint = pose.keypoints[11]; // Left hip
  const kneeKeypoint = pose.keypoints[13]; // Left knee
  const ankleKeypoint = pose.keypoints[15]; // Left ankle

  if (hipKeypoint.score > exerciseState.current.confidenceThreshold &&
      kneeKeypoint.score > exerciseState.current.confidenceThreshold &&
      ankleKeypoint.score > exerciseState.current.confidenceThreshold) {
    
    const hipY = hipKeypoint.position.y;
    const kneeY = kneeKeypoint.position.y;
    const ankleY = ankleKeypoint.position.y;
    
    // Calculate relative positions
    const hipToKneeDistance = Math.abs(hipY - kneeY);
    const kneeToAnkleDistance = Math.abs(kneeY - ankleY);
    
    // Down position: hip is closer to knee level
    if (!exerciseState.current.isInDownPosition && 
        hipToKneeDistance < kneeToAnkleDistance * 0.7) {
      exerciseState.current.isInDownPosition = true;
      setFeedback("Good! Now stand up");
      console.log('Squat down position detected');
    } 
    // Up position: hip is significantly higher than knee
    else if (exerciseState.current.isInDownPosition && 
             hipToKneeDistance > kneeToAnkleDistance * 1.2) {
      exerciseState.current.isInDownPosition = false;
      setRepCount(prev => {
        const newCount = prev + 1;
        console.log(`Squat rep count increased to ${newCount}`);
        return newCount;
      });
      setCalories(prev => {
        const newCalories = prev + 0.32;
        console.log(`Calories burned increased to ${newCalories.toFixed(2)}`);
        return newCalories;
      });
      setFeedback("Great squat! Keep going");
      console.log('Squat up position detected');
    }

  }
};

