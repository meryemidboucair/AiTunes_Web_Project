import React, { useState, useRef, useEffect } from "react";
import "../../App.css";
import "./HearDemoForm.css";
import { FaPlay, FaPause, FaRedo, FaStop } from "react-icons/fa"; 

function HearDemoForm() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioFiles, setAudioFiles] = useState([]);  
  const [selectedAudio, setSelectedAudio] = useState("");  
  const audioRef = useRef(new Audio());
  const progressRef = useRef(null);


  useEffect(() => {
    fetch("http://127.0.0.1:3030/api/list-audios")
      .then((response) => response.json())
      .then((data) => setAudioFiles(data.audios))
      .catch((error) => console.error("Erreur de récupération des audios:", error));
  }, []);
  

  useEffect(() => {
    if (selectedAudio) {
      const audio = audioRef.current;
      audio.src = selectedAudio; 

      audio.onloadedmetadata = () => {
        setAudioDuration(audio.duration);
      };

      const interval = setInterval(() => {
        if (audio && isPlaying) {
          setCurrentTime(audio.currentTime);
          if (progressRef.current) {
            progressRef.current.style.width = `${(audio.currentTime / audioDuration) * 100}%`;
          }
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying, selectedAudio, audioDuration]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error("Erreur audio:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;  
    audio.play().catch((err) => console.error("Erreur audio:", err)); 
    setIsPlaying(true);
  };

  const handleStop = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const handleAudioSelection = (event) => {
    setSelectedAudio(event.target.value);  
    setCurrentTime(0);   
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className={`hear-demo-page ${isPlaying ? "audio-playing" : "audio-paused"}`}>
      <div className="hear-demo-container">
        <h1>Hear Demo</h1>

        <div className="audio-file-picker">
          <select onChange={handleAudioSelection} value={selectedAudio} disabled={isPlaying}>
            <option value="">Sélectionner un audio</option>
            {audioFiles.map((audio, index) => (
              <option key={index} value={`http://127.0.0.1:3030/audio/${audio}`}>
                {audio}
              </option>
            ))}
          </select>
        </div>

        <div className="audio-controls">
          <button onClick={handlePlayPause} disabled={!selectedAudio}>
            {isPlaying ? <FaPause className="icon" /> : <FaPlay className="icon" />}
          </button>
          <button onClick={handleStop} disabled={!selectedAudio}>
            <FaStop className="icon" />
          </button>
          <button onClick={handleRestart} disabled={!selectedAudio}>
            <FaRedo className="icon" />
          </button>
        </div>

        <div className="audio-progress">
          <div className="progress-bar" ref={progressRef}></div>
        </div>

        <div className="audio-duration">
          <span>{formatTime(currentTime)} / {formatTime(audioDuration)}</span>
        </div>
      </div>
    </div>
  );
}

export default HearDemoForm;
