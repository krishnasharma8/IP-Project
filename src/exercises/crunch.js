export const detectCrunch = (pose, exerciseState, setRepCount, setFeedback, setCalories) => {
    if (!pose || !pose.keypoints) return;
    
    const shoulderKeypoint = pose.keypoints[5]; // Left shoulder
    const hipKeypoint = pose.keypoints[11]; // Left hip
    const kneeKeypoint = pose.keypoints[13]; // Left knee
  
    if (shoulderKeypoint.score > exerciseState.current.confidenceThreshold &&
        hipKeypoint.score > exerciseState.current.confidenceThreshold &&
        kneeKeypoint.score > exerciseState.current.confidenceThreshold) {
      
      // Calculate distances and angles
      const shoulderToHipDistance = Math.abs(shoulderKeypoint.position.y - hipKeypoint.position.y);
      const hipToKneeDistance = Math.abs(hipKeypoint.position.y - kneeKeypoint.position.y);
      
      // Calculate angle between shoulder-hip and hip-knee
      const angle = Math.atan2(
        shoulderKeypoint.position.y - hipKeypoint.position.y,
        shoulderKeypoint.position.x - hipKeypoint.position.x
      ) - Math.atan2(
        kneeKeypoint.position.y - hipKeypoint.position.y,
        kneeKeypoint.position.x - hipKeypoint.position.x
      );
  
      // Down position: more curled up
      if (!exerciseState.current.isInDownPosition && 
          shoulderToHipDistance < hipToKneeDistance * 0.6 &&
          Math.abs(angle) < Math.PI / 3) {
        exerciseState.current.isInDownPosition = true;
        setFeedback("Good! Now lower down");
      } 
      // Up position: more extended
      else if (exerciseState.current.isInDownPosition && 
               shoulderToHipDistance > hipToKneeDistance * 0.9 &&
               Math.abs(angle) > Math.PI / 2) {
        exerciseState.current.isInDownPosition = false;
        setRepCount(prev => prev + 1);
        setCalories(prev => prev + 0.25);
        setFeedback("Great crunch! Keep going");
      }
    }
};