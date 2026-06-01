import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./facial_expression.css";

function MoodDetector() {
  const videoRef = useRef(null);
  const [mood, setMood] = useState("Detecting...");

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    const MODEL_URL = "/models";

    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

    startVideo();
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error(err);
    }
  };

  const moodDetection = async () => {
    if (!videoRef.current) return;

    const detection = await faceapi
      .detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

    if (!detection) {
      setMood("No Face Detected");
      return;
    }

    const expressions = detection.expressions;

    const detectedMood = Object.keys(expressions).reduce((a, b) =>
      expressions[a] > expressions[b] ? a : b
    );

    console.log(detectedMood);
    setMood(detectedMood);
  };

  return (
    <div className='mood-element'>
      <video className="video-feed"
        ref={videoRef}
        autoPlay
        muted
        width="640"
        height="480"
      />

      

      <button onClick={moodDetection}>
        Detect Mood
      </button>

      <h2>Mood: {mood}</h2>
    </div>
  );
}

export default MoodDetector;