import { useState } from 'react'
import MoodDetector from './components/facial_expression';
import MoodSongs from './components/MoodSongs';
import './App.css'

function App() {
  

  return (
    <>
     <MoodDetector/>
     <MoodSongs/>
    </>
  )
}

export default App
