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
  const streamRef = useRef(null); // Stores camera stream

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const video = videoRef.current;
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });

        video.srcObject = stream;
        streamRef.current = stream; // Store the stream
        await new Promise((resolve) => (video.onloadedmetadata = resolve));
        await video.play();
        setIsVideoReady(true);
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

  return (
    <div>
      <Navbar />
      <h1 className="app-title">Workout Tracker</h1>
      <select
        onChange={(e) => setCurrentExercise(e.target.value)}
        value={currentExercise}
      >
        <option value={EXERCISES.SQUAT}>Squat</option>
        <option value={EXERCISES.PUSHUP}>Push-Up</option>
        <option value={EXERCISES.CRUNCH}>Crunch</option>
      </select>

      <div className="video-container">
        <video ref={videoRef} width="640" height="480" playsInline muted className="video-feed" />
        <canvas ref={canvasRef} width="640" height="480" className="pose-canvas" />
      </div>

      <div className="stats-panel">
        <h2>Reps: {repCount}</h2>
        <h2>Calories: {calories.toFixed(2)}</h2>
        <h3>{feedback}</h3>
      </div>

      <Footer />
    </div>
  );
};

export default WorkoutTracker;
