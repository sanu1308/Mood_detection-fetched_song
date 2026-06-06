import React, { useRef, useState } from "react";
import './MoodSongs.css';
const MoodSongs=({songs})=>{
    const audioRefs = useRef([]);
    const [playingIndex, setPlayingIndex] = useState(null);

    const handleToggle = async (index) => {
      const audio = audioRefs.current[index];

      if (!audio) return;

      if (playingIndex === index && !audio.paused) {
        audio.pause();
        setPlayingIndex(null);
        return;
      }

      audioRefs.current.forEach((item, itemIndex) => {
        if (item && itemIndex !== index) {
          item.pause();
        }
      });

      try {
        await audio.play();
        setPlayingIndex(index);
      } catch (error) {
        console.error('Unable to play audio', error);
      }
    };


    return (
  <div className="moodsong-container">
  <div className='mood-songs'>
    <h2>Recommended Songs</h2>

    {songs.length === 0 && (
      <div className="empty-state">
        No songs matched the detected mood yet.
      </div>
    )}

    {songs.map((song, index) => (
      <div className={`song ${playingIndex === index ? 'is-playing' : ''}`} key={index}>
        <div className="song-details">
          <div className="song-badge">{playingIndex === index ? 'Playing' : 'Ready'}</div>
          <div className="title">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
        </div>

        <div className="play-pause-button">
          <audio
            ref={(element) => {
              audioRefs.current[index] = element;
            }}
            src={song.audio_url}
            onEnded={() => setPlayingIndex(null)}
            onPause={() => {
              if (playingIndex === index) {
                setPlayingIndex(null);
              }
            }}
          />

          <button
            type="button"
            className="play-toggle"
            onClick={() => handleToggle(index)}
            aria-label={playingIndex === index ? `Pause ${song.title}` : `Play ${song.title}`}
          >
            <span className="play-toggle-icon">{playingIndex === index ? '❚❚' : '▶'}</span>
            <span>{playingIndex === index ? 'Pause' : 'Play'}</span>
          </button>
        </div>
      </div>
    ))}
  </div>
  </div>
)
}

export default MoodSongs;