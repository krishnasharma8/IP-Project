import React, { useEffect, useRef, useState } from "react";
import * as ml5 from "ml5";
import { detectSquat } from "../exercises/squat";
import { detectPushup } from "../exercises/pushup";
import { detectCrunch } from "../exercises/crunch";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EXERCISES = {
  SQUAT: "squat",
  PUSHUP: "pushup",
  CRUNCH: "crunch",
};

const WorkoutTracker = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentExercise, setCurrentExercise] = useState(EXERCISES.SQUAT);
  const [repCount, setRepCount] = useState(0);
  const [calories, setCalories] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isVideoReady, setIsVideoReady] = useState(false);
  const streamRef = useRef(null);
  const poseNetRef = useRef(null);
  const exerciseState = useRef({ isInDownPosition: false, confidenceThreshold: 0.5 });

  const processPose = (pose) => {
    if (!pose || !pose.keypoints) return;

    poseNetRef.current.on("pose", (results) => {
      if (results.length > 0) {
        const pose = results[0].pose;
        console.log("🔍 Pose detected:", pose);
      }
    });
    
  
    switch (currentExercise) {
      case EXERCISES.SQUAT:
        detectSquat(pose, exerciseState, setRepCount, setFeedback, setCalories);
        break;
      case EXERCISES.PUSHUP:
        detectPushup(pose, exerciseState, setRepCount, setFeedback, setCalories);
        break;
      case EXERCISES.CRUNCH:
        detectCrunch(pose, exerciseState, setRepCount, setFeedback, setCalories);
        break;
      default:
        console.warn("Unknown exercise selected:", currentExercise);
        break;
    }
  };
  

  useEffect(() => {
    const setupCamera = async () => {
      try {
        console.log("Setting up camera...");
        const video = videoRef.current;
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
        video.srcObject = stream;
        streamRef.current = stream;
        await new Promise((resolve) => (video.onloadedmetadata = resolve));
        await video.play();
        setIsVideoReady(true);
        console.log("Camera setup complete");
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    setupCamera();

    return () => {
      console.log("Turning off camera...");
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isVideoReady) return;

    const setupPoseNet = async () => {
      console.log("Loading PoseNet...");
      poseNetRef.current = ml5.poseNet(videoRef.current, () => {
        console.log("PoseNet model loaded");
      });

      poseNetRef.current.on("pose", (results) => {
        if (results.length > 0) {
          const pose = results[0].pose;
          console.log("Pose detected:", pose);
          drawPose(pose);
          processPose(pose);
        }
      });
    };

    setupPoseNet();
  }, [isVideoReady, currentExercise]);

  const drawPose = (pose) => {
    if (!canvasRef.current) {
      console.warn("Canvas not available yet, skipping pose drawing.");
      return;
    }
  
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      console.warn("Canvas context is null.");
      return;
    }
  
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  
    pose.keypoints.forEach((point) => {
      if (point.score > 0.5) {
        ctx.beginPath();
        ctx.arc(point.position.x, point.position.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    });
  };
  

  return (
    <div>
      <Navbar />
      <h1 className="app-title" style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
        Workout Tracker
      </h1>
      <div style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
        <select onChange={(e) => setCurrentExercise(e.target.value)} value={currentExercise}>
          <option value={EXERCISES.SQUAT}>Squat</option>
          <option value={EXERCISES.PUSHUP}>Push-Up</option>
          <option value={EXERCISES.CRUNCH}>Crunch</option>
        </select>
      </div>

      <div className="video-container" style={{ display: "flex", margin: "30px", textAlign: "center", justifyContent: "center", paddingLeft: "50px" }}>
        <div className="stats-panel" style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", marginRight: "50px" }}>
          <video ref={videoRef} playsInline muted className="video-feed" />
          <canvas ref={canvasRef} className="pose-canvas" width={640} height={480} />
        </div>

        <div className="stats-panel" style={{ display: "flex", flexDirection: "column", paddingTop: "150px", textAlign: "left" }}>
          <h2>Reps: {repCount}</h2>
          <h2>Calories: {calories.toFixed(2)}</h2>
          <h2>Feedback: {feedback}</h2>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorkoutTracker;




