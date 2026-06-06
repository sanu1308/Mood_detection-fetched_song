import { useEffect, useState } from 'react'
import Facialexpression from './components/facial_expression';
import MoodSongs from './components/MoodSongs';
import './App.css'
import * as faceapi from 'face-api.js';
import react from 'react';

function App() {
    const [songs,setsongs]=useState([
  
  ])

  return (
    <>
     <Facialexpression setsongs={setsongs}/>
     <MoodSongs songs={songs}/>
    </>
  )
}

export default App
