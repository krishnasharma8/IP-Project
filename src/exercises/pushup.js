export const detectPushup = (
    pose,
    exerciseState,
    setRepCount,
    setFeedback,
    setCalories
  ) => {
    if (!pose || !pose.keypoints) return;
  
    const shoulderKeypoint = pose.keypoints[5]; // Left shoulder
    const elbowKeypoint = pose.keypoints[7]; // Left elbow
  
    if (
      shoulderKeypoint.score > exerciseState.current.confidenceThreshold &&
      elbowKeypoint.score > exerciseState.current.confidenceThreshold
    ) {
      const shoulderY = shoulderKeypoint.position.y;
      const elbowY = elbowKeypoint.position.y;
  
      if (!exerciseState.current.isInDownPosition && shoulderY > elbowY - 30) {
        exerciseState.current.isInDownPosition = true;
        setFeedback("Good! Now push up");
      } else if (
        exerciseState.current.isInDownPosition &&
        shoulderY < elbowY - 60
      ) {
        exerciseState.current.isInDownPosition = false;
        setRepCount((prev) => prev + 1);
        setCalories((prev) => prev + 0.45);
        setFeedback("Great pushup! Keep going");
      }
    }
  };
  
